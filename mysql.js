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





app.use('/public', express.static('static'));

app.use(bodyParser.json()); // for parsing application/json

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


app.get('/mainPageSpotsData.json', (req, res) => {
    console.log('mainPageSpotsData request is comming ' + new Date());
    connection.query("SELECT distinct startspotname from itineraries WHERE startspotname LIKE '%" + req.query.search + "%'", function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results.map((item) => item.startspotname));
    });
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