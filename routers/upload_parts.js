const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const upload = multer({ dest: 'uploads/multer/' })

router.post('/parts', upload.single('file'),  (req, res) => {
  // 接受图片唯一标识符号
    let fileId = req.body.fileId;
    // 接受切片索引
    let pieceNumber = req.body.pieceNumber;
    // 建立图片存储目录
    let filepath = path.join(__dirname,'..','uploads/named_ordered_parts',fileId);
    // 判断目录是否存在，存在的话直接使用并存储切片，不存在的话就新建。
    if (fs.existsSync(filepath)) {
      fs.readFile(req.file.path, function (err, data) { //读取请求中multer处理过的文件数据，并按照uuid和分片的序号为分片的名字写入到服务器上，这里的req.file.path就是最开始multer初始化的时候定义的文件存储位置
        fs.writeFile(path.join(filepath, pieceNumber), data, (err) => {
          if (!err) {
            res.send("写入后面的文件")
          }
        })
      })
    } else {
      fs.mkdirSync(filepath);
      fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(path.join(filepath, pieceNumber), data, (err) => {
          if (!err) {
            res.send("第一次写入并新建文件夹")
          }
        })
      })
    }
})

router.post('/merge',  (req, res) => {
  let {fileId, fileName} = req.body;
  let fileSplit = fileName.split(".");
  let fileExt = fileSplit[fileSplit.length - 1];
  let partsPath = path.resolve(process.cwd(), `uploads/named_ordered_parts/${fileId}`);
  // let writeStream;
  // fs.open(`${partsPath}.${fileExt}`, 'w+', () => {
  let  writeStream = fs.createWriteStream(`${partsPath}.${fileExt}`, {flags: 'a' });
  // })
  fs.readdir(partsPath, (err, files) => {
    let piece, piecesNumber = 1;
    function merge() {
      if (piecesNumber <= files.length) {
        piece = fs.createReadStream(`${partsPath}/${piecesNumber}`)
        piece.pipe(writeStream, { end: (piecesNumber === files.length) })
        piece.on("end", () => {
          piecesNumber++;
          merge()
        })
      } else {
        res.send("上传完成，合并成功")
      }
    }
    if (err) {
      console.log("readdir出错")
    } else {
      merge()
    }
  })
})

module.exports = router