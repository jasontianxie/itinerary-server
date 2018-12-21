const express = require('express');
const app = express();
const port = 8000;
const djkstra = require('./algorithm/djikstra');
const bodyParser = require('body-parser');

const mainPageSlideData =[
    {pic:'http://localhost:8000/public/mainPageSlidePics/15380434541828.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381044615697.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381045921996.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381046688621.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381048978867.jpeg',href:'/#/second',description:'this is a test'},
]

const mainPageSpotsData =[
    {id:1,level1:'重庆',level2:'大足',fullname:'五星华府'},
    {id:20,level1:'重庆',level2:'永川',fullname:'双石小学'},
    {id:3,level1:'陕西',level2:'西安',fullname:'钟楼'},
    {id:4,level1:'陕西',level2:'咸阳',fullname:'咸阳机场'},
]

// const allVertex = [1,2,3,4,5];
// const distanceBetweenAnyTwoVertex = [[0,7,7,5,4],[2,0,3,1,2],[3,2,0,2,4],[5,1,2,0,5],[4,1,1,1,0]];

// console.log(djkstra(allVertex,distanceBetweenAnyTwoVertex));

app.use('/public',express.static('static'));

app.use(bodyParser.json()); // for parsing application/json

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
 });

app.get('/mainPageSlideData', (req, res) => {
    console.log('mainPageSlideData request is comming '+new Date());
    res.send(mainPageSlideData);
});

app.post('/users', (req, res) => {
    res.send({name:req.body.userName, pass:req.body.password, id:Math.floor(10*Math.random())});
});

app.get('/mainPageSpotsData.json', (req, res) => {
    console.log('mainPageSpotsData get request is comming '+new Date());
    res.send(mainPageSpotsData.map((item)=>item+Math.floor(10*Math.random())));
});

app.post('/mainPageSpotsData.json', (req, res) => {
    console.log('mainPageSpotsData post request is comming '+new Date());
    console.log(req.body);
    
    res.send(mainPageSpotsData);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));