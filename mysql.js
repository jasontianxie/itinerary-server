const express = require('express');
// const mysql = require('mysql');
const app = express();
const port = 3333;
const bodyParser = require('body-parser');
const router = require("./routers/index");
const cors = require('cors');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '123456ABCabc',
//     database: 'itinerary'
// });
// connection.connect(function (err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }

//     console.log('connected as id ' + connection.threadId);
// });

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
app.use(cors(corsOptions));

app.use('/public',express.static('static',{index: false}));
app.use(express.static('front-end'));

app.use(bodyParser.json()); // for parsing application/json

app.use('/', router);
app.use('/uploads', require('./routers/upload_parts'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))