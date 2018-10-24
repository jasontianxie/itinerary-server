const express = require('express');
const app = express();
const port = 8000;
const djkstra = require('./algorithm/djikstra');

const mainPageSlideData =[
    {pic:'http://localhost:8000/public/mainPageSlidePics/15380434541828.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381044615697.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381045921996.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381046688621.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381048978867.jpeg',href:'/#/second',description:'this is a test'},
]

const mainPageSpotsData =[
    'chongqing',
    'sichuan',
    'shanxi',
    'zhejiang'
]

const allVertex = [1,2,3,4,5];
const distanceBetweenAnyTwoVertex = [[0,2,3,5,4],[2,0,1,1,2],[3,1,0,2,4],[5,1,2,0,5],[4,2,4,5,0]];

console.log(djkstra(allVertex,distanceBetweenAnyTwoVertex));

// app.use('/public',express.static('static'));

// app.get('/mainPageSlideData.json', (req, res) => {
//     console.log('mainPageSlideData request is comming '+new Date());
//     res.header('Access-Control-Allow-Origin', '*');
//     res.send(mainPageSlideData);
// })

// app.get('/mainPageSpotsData.json', (req, res) => {
//     console.log('mainPageSpotsData request is comming '+new Date());
//     res.header('Access-Control-Allow-Origin', '*');
//     res.send(mainPageSpotsData.map((item)=>item+Math.floor(10*Math.random())));
// })

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))