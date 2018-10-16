const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8000;

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456ABCabc',
    database:'itinerary'
});
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });


const mainPageSlideData =[
    {pic:'http://localhost:8000/public/mainPageSlidePics/15380434541828.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381044615697.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381045921996.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381046688621.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381048978867.jpeg',href:'/#/second',description:'this is a test'},
]


app.use('/public',express.static('static'));

app.get('/mainPageSlideData.json', (req, res) => {
    console.log('mainPageSlideData request is comming '+new Date());
    res.header('Access-Control-Allow-Origin', '*');
    res.send(mainPageSlideData);
})

app.get('/mainPageSpotsData.json', (req, res) => {
    console.log('mainPageSpotsData request is comming '+new Date());
    res.header('Access-Control-Allow-Origin', '*');
    connection.query("SELECT distinct startspotname from itineraries WHERE startspotname LIKE '%"+req.query.search+"%'", function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results.map((item)=>item.startspotname));
      });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))