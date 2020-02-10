const fs = require("fs");
const path = require("path");

function getDirSize(path) {
    const subFileNames = fs.readdirSync(path);
    let size = 0;
    for (let name of subFileNames) {
        fs.stat(name,function(err,stats){
            if (stats.isDirectory()) { // 如果是文件夹
                getDirSize(path + name);
            } else {
                size += stats.size;
            }
        })
    }
    return size;
}

module.exports = getDirSize;
