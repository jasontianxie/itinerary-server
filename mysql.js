const express = require("express");
var session = require('express-session');
var FileStore = require('session-file-store')(session);
// const mysql = require("mysql");
const app = express();
const port = 3333;
const bodyParser = require("body-parser");
const router = require("./routers/index");
const cors = require("cors");

// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "123456ABCabc",
//     database: "itinerary"
// });
// connection.connect(function (err) {
//     if (err) {
//         console.error("error connecting: " + err.stack);
//         return;
//     }

//     console.log("connected as id " + connection.threadId);
// });

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

var fileStoreOptions = {};
 
app.use(session({
    name: 'sessionId',
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: 1800000 },
    resave: false,
    saveUninitialized: true, 
    store: new FileStore(fileStoreOptions),
    secret: 'identify secret',
    rolling: true
}));

app.use(cors(corsOptions));

app.use("/public",express.static("static",{index: false,}));
app.use("/media",express.static("uploads/named_ordered_parts",{index: false,}));
app.use("/public/address",(req,res) => { // 如果上面的/public/address下可以找到地址的json就用上面的，否则就返回空，如果这里不返回空，前端会收到404的错误
    res.end(JSON.stringify([]));
});
app.use(express.static("front-end"));

app.use(bodyParser.json()); // for parsing application/json
// app.use('/', function(req, res, next){
//     var sess = req.session;
//     var username = sess.username;
//     if(!username) {
//         res.status(401).end()
//     } else {
//         next()
//     }
//   });
app.use("/", router);
// app.use("/api/uploads", require("./routers/upload_parts")); //上传文件，单独放到一个服务器中itinerary-media-server了，2021-02-05
app.use("/api/spots", require("./routers/spots"));
app.use("/api/users", require("./routers/users"));
app.use("/api/itineraries", require("./routers/itineraries"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));