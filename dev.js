const express = require('express');
const app = express();
const port = 3333;
const djkstra = require('./algorithm/djikstra');
const bodyParser = require('body-parser');
const cors = require('cors');

const mainPageSlideData =[
    {pic:'http://localhost:8000/public/mainPageSlidePics/15380434541828.jpeg',href:'#',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381044615697.jpeg',href:'#',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381045921996.jpeg',href:'#',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381046688621.jpeg',href:'#',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381048978867.jpeg',href:'#',description:'this is a test'},
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

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
app.use(cors(corsOptions));
app.use('/public',express.static('static',{index: false}));
app.use(express.static('front-end'));

app.use(bodyParser.json()); // for parsing application/json

app.get('/mainPageSlideData', (req, res) => {
    console.log('mainPageSlideData request is comming '+new Date());
    res.send(mainPageSlideData);
});

app.post('/users', (req, res) => {
    res.send([{name:req.body.userName, pass:req.body.password, id:Math.floor(10*Math.random())}]);
});

app.get('/mainPageSpotsData.json', (req, res) => {
    console.log('mainPageSpotsData get request is comming '+new Date());
    res.send(mainPageSpotsData.map((item)=>item+Math.floor(10*Math.random())));
});

app.post('/spots', (req, res) => {
    console.log('mainPageSpotsData post request is comming '+new Date());
    console.log(req.body);
    
    res.send(mainPageSpotsData);
});

app.post('/itineraries', (req, res) => {
    let reqBody = req.body,
    contentHtml = reqBody.contentHtml;

    // 将文本中可能存在的除img，vedio，br之外的所有script标签替换成文本，并且img和vedio标签的src必须是指定的地址（用户上传过后，在本网站生成的地址），不能是用户随意写的
    
    contentHtml = contentHtml.replace(/<(img src="https\:\/\/ss0\.bdstatic\.com[^>]*)>/g, "@01212dfgdfgdfgdAASFSADFASDF*$1@234523453sdfgsgsdERHGHSH*");
    contentHtml = contentHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;"); //过滤所有html标签
    contentHtml = contentHtml.replace(/\&lt\;(\/?)div\&gt\;/g, "<$1div>"); // 显示div标签
    contentHtml = contentHtml.replace(/\&lt\;br(\/?)\&gt\;/gi, "<br$1>"); //显示br标签
    contentHtml = contentHtml.replace(/\@01212dfgdfgdfgdAASFSADFASDF\*/g, "<").replace(/\@234523453sdfgsgsdERHGHSH\*/g, ">"); //显示img标签，并且该img标签的地址必须以特定网址开头

    console.log(contentHtml);
    res.send("success");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));