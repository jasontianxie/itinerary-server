const instanse = require("./index");
const {createSpot,} = require("./spots");

const Medias = instanse.sequelize.define("medias", {
    mediaId: { type: instanse.Sequelize.INTEGER, primaryKey: true, },
    spotId: instanse.Sequelize.INTEGER,
    mediaName: instanse.Sequelize.CHAR,
    name: instanse.Sequelize.CHAR,
    path: instanse.Sequelize.CHAR,
},{
    timestamps: false,
});

function insertMedia(data) {
    if (!data.spotId) {
        return createSpot({itineraryId: data.itineraryId}).then((result) => { // 如果上传的图片没有spotId，那么就需要先创建一个spotId，result就是刚插入的条目
            return Medias.create({
                spotId: result.spotId,
                mediaName: data.mediaName,
                name: data.name,
                path: data.path,
            });
        });
    } else {
        return Medias.create({
            spotId: data.spotId,
            mediaName: data.mediaName,
            name: data.name,
            path: data.path,
        });
    }
}
function queryMedias(name, pass) {
    return Medias.findAll({
        where: {
            name:name,
            pass:pass,
        },
    });
}

module.exports = {insertMedia, queryMedias,};