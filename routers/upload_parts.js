const express = require("express");
const router = express.Router();
const multer  = require("multer");
const path = require("path");
const fs = require("fs");
const rimraf = require("../utils/removeDir");
const upload = multer({ dest: "uploads/multer/",});

router.post("/parts", upload.single("file"),  (req, res) => {
    // 接受图片唯一标识符号
    let fileId = req.body.fileId;
    // 接受切片索引
    let pieceNumber = req.body.pieceNumber;
    // 接受文件名
    let fileName = req.body.fileName;
    // 获取文件的扩展名
    let fileSplit = fileName.split(".");
    let fileExt = fileSplit[fileSplit.length - 1];
    // 建立图片存储目录
    let filepath = path.join(__dirname,"..","uploads/named_ordered_parts",fileId);
    // 判断目录是否存在，存在的话直接使用并存储切片，不存在的话就新建。
    if(!(["jpg", "jpeg", "png", "mp4",].includes(fileExt))) {
        res.send({code: 1, message: "文件类型错误",});
        fs.unlink(req.file.path, (err) => { //删除multer生成的临时文件
            if (err) throw err;
            console.log("临时文件已删除");
        });
        return;
    }
    if (fs.existsSync(filepath)) {
        fs.readFile(req.file.path, function (err, data) { //读取请求中multer处理过的文件数据，并按照uuid和分片的序号为分片的名字写入到服务器上，这里的req.file.path就是最开始multer初始化的时候定义的文件存储位置
            fs.writeFile(path.join(filepath, pieceNumber), data, (err) => {
                if (!err) {
                    fs.unlink(req.file.path, (err) => { //删除multer生成的临时文件
                        if (err) throw err;
                        console.log("临时文件已删除");
                    });
                    res.send("写入后面的文件");
                }
            });
        });
    } else {
        fs.mkdirSync(filepath);
        fs.readFile(req.file.path, function (err, data) {
            fs.writeFile(path.join(filepath, pieceNumber), data, (err) => {
                if (!err) {
                    fs.unlink(req.file.path, (err) => { //删除multer生成的临时文件
                        if (err) throw err;
                        console.log("临时文件已删除");
                    });
                    res.send("第一次写入并新建文件夹");
                }
            });
        });
    }
});

router.post("/merge",  (req, res) => {
    let {fileId, fileName,} = req.body;
    let fileSplit = fileName.split(".");
    let fileExt = fileSplit[fileSplit.length - 1];
    let partsPath = path.resolve(process.cwd(), `uploads/named_ordered_parts/${fileId}`);
    let  writeStream = fs.createWriteStream(`${partsPath}.${fileExt}`, {flags: "a",});
    fs.readdir(partsPath, (err, files) => {
        let piece, piecesNumber = 1;
        function merge() {
            if (piecesNumber <= files.length) {
                piece = fs.createReadStream(`${partsPath}/${piecesNumber}`);
                piece.pipe(writeStream, { end: (piecesNumber === files.length),});
                piece.on("end", () => {
                    piecesNumber++;
                    merge();
                });
            } else {
                rimraf(partsPath); //上传成功后删除临时文件夹
                res.send({code: 0, path: `/media/${fileId}.${fileExt}`});
            }
        }
        if (err) {
            console.log("readdir出错");
        } else {
            merge();
        }
    });
});

module.exports = router;