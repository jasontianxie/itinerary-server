const express = require('express')
const app = express()
const port = 8000

const mainPageSlideData =[
    {pic:'http://localhost:8000/public/mainPageSlidePics/15380434541828.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381044615697.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381045921996.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381046688621.jpeg',href:'/#/second',description:'this is a test'},
    {pic:'http://localhost:8000/public/mainPageSlidePics/15381048978867.jpeg',href:'/#/second',description:'this is a test'},
]

app.use('/public',express.static('static'));

app.get('/mainPageSlideData.json', (req, res) => {
    console.log('request is comming');
    res.header('Access-Control-Allow-Origin', '*');
    res.send(mainPageSlideData)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))