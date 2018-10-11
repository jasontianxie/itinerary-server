const express = require('express')
const app = express()
const port = 8000

const mainPageSlideData =[
    {pic:'https://pic.qyer.com/public/home/focus/2018/10/04/15386419503307?imageMogr2/interlace/1|imageslim',href:'#',description:'this is a test'},
    {pic:'https://pic.qyer.com/public/home/focus/2018/10/04/15386419503307?imageMogr2/interlace/1|imageslim',href:'#',description:'this is a test'},
    {pic:'https://pic.qyer.com/public/home/focus/2018/10/04/15386419503307?imageMogr2/interlace/1|imageslim',href:'#',description:'this is a test'},
    {pic:'https://pic.qyer.com/public/home/focus/2018/10/04/15386419503307?imageMogr2/interlace/1|imageslim',href:'#',description:'this is a test'},
    {pic:'https://pic.qyer.com/public/home/focus/2018/10/04/15386419503307?imageMogr2/interlace/1|imageslim',href:'#',description:'this is a test'}
]

app.get('/mainPageSlideData.json', (req, res) => {console.log('request is comming');res.send(mainPageSlideData)})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))