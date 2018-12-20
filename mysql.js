const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const router = require("./routers/index");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456ABCabc',
    database: 'itinerary'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


const mainPageSlideData = [
    { pic: 'http://localhost:8000/public/mainPageSlidePics/15380434541828.jpeg', href: '/#/second', description: 'this is a test' },
    { pic: 'http://localhost:8000/public/mainPageSlidePics/15381044615697.jpeg', href: '/#/second', description: 'this is a test' },
    { pic: 'http://localhost:8000/public/mainPageSlidePics/15381045921996.jpeg', href: '/#/second', description: 'this is a test' },
    { pic: 'http://localhost:8000/public/mainPageSlidePics/15381046688621.jpeg', href: '/#/second', description: 'this is a test' },
    { pic: 'http://localhost:8000/public/mainPageSlidePics/15381048978867.jpeg', href: '/#/second', description: 'this is a test' },
]


app.use('/public', express.static('static'));

app.use(bodyParser.json()); // for parsing application/json

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.get('/mainPageSlideData.json', (req, res) => {
    console.log('mainPageSlideData request is comming ' + new Date());
    res.send(mainPageSlideData);
})

app.get('/mainPageSpotsData.json', (req, res) => {
    console.log('mainPageSpotsData request is comming ' + new Date());
    connection.query("SELECT distinct startspotname from itineraries WHERE startspotname LIKE '%" + req.query.search + "%'", function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results.map((item) => item.startspotname));
    });
})
app.post('/addNewRouteForm.json', (req, res) => {
    console.log('addNewRouteForm request is comming ' + new Date());
    console.log(req.body);

    const reqBody = req.body;
    let levelStart = "";
    let levelEnd = "";
    let defStart;
    let defEnd;
    let promises = [];
    i=0;
    j=0;
    if (reqBody.startSpotId === "") {//更新数据点
        while(i < 5){
            levelStart += (reqBody.startSelect[i] ? "'"+ reqBody.startSelect[i] + "'" : null) + "," ;
            i++;
        }
        levelStart += "'"+reqBody.startSpot+"'";
        console.log("("+ reqBody.country +"', "+ levelStart +")");
        defStart = new Promise(function(resolve,reject){
            connection.query("INSERT INTO spots (country,level1,level2,level3,level4,level5,fullname) VALUES ('"+ reqBody.country +"', "+ levelStart +")", function (error, results, fields) {
                if (error) throw error;
                console.log("insert values :");
                console.log(results);
                console.log(fields);
                resolve(results);
            });
        });
        promises.push(defStart);
    }
    if (reqBody.endSpotId === "") {//更新数据点
        while(j < 5){
            levelEnd += (reqBody.endSelect[j] ? "'"+ reqBody.endSelect[j] + "'" : null) + "," ;
            j++;
        }
        levelEnd += "'"+reqBody.endSpot+"'";
        console.log("("+ reqBody.country +"', "+ levelEnd +")")
        defEnd = new Promise(function(resolve,reject){
            connection.query("INSERT INTO spots (country,level1,level2,level3,level4,level5,fullname) VALUES ('"+ reqBody.country +"', "+ levelEnd +")", function (error, results, fields) {
                if (error) throw error;
                console.log("insert values :" + results);
                resolve(results);
            });
        });
        promises.push(defEnd);
    }
    Promise.all(promises).then(results => {
        if(results.length > 0){

        } else {
            
        }
    });
        res.send('yes');
})
app.use('/', router);
app.post('/mainPageSpotsData.json', (req, res) => {
    let queryArr = req.body.value,
        queryStr = '';

    for (let i = 0; i < queryArr.length; i++) {
        if (i == queryArr.length - 1) {
            queryStr += "fullname like '%" + queryArr[i] + "%'";
        } else {
            queryStr += "level" + (i+1) + "='" + queryArr[i] + "' and "
        }

    }
    console.log('queryStr:'+queryStr);
    console.log('mainPageSpotsData request is comming ' + new Date());
    console.log(req.body);

    connection.query("SELECT * from spots WHERE " + queryStr, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))