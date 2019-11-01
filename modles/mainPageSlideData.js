const instanse = require("./index");

const main_page_slides = instanse.sequelize.define("main_page_slides", {
    itineraryId: { type: instanse.Sequelize.INTEGER, primaryKey: true },
    week: instanse.Sequelize.CHAR,
},{
    timestamps: false
});

const itineraries = instanse.sequelize.define("itineraries", {
    itineraryId: { type: instanse.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    content: instanse.Sequelize.TEXT,
    headPicId: instanse.Sequelize.CHAR,
    lastModified: instanse.Sequelize.INTEGER
},{
    timestamps: false
});

const itinerary_medias = instanse.sequelize.define("itinerary_medias", {
    itineraryId: { type: instanse.Sequelize.INTEGER, primaryKey: true },
    mediaId: instanse.Sequelize.CHAR,
    name: instanse.Sequelize.CHAR,
    path: instanse.Sequelize.CHAR,
    mediaName: instanse.Sequelize.CHAR
},{
    timestamps: false
});

function queryMainPageSlideData(){
    return main_page_slides.findAll({// 先查找出某一期的所有游记id
        where: {
            week: "2019-10-28"
        }
    }).then((res) => {
        let itineraryIds = []
        res.forEach((item) => {
            itineraryIds.push(itineraries.find({ // 然后根据游记id，查找出这篇游记的头图的id
                where: {
                    itineraryId: item.itineraryId
                }
            }))
        })
        return Promise.all(itineraryIds)
    }, (error) => console.log(error)).then((itineraryArray) => {
        let headPicIds = []
        itineraryArray.forEach((i) => {
            headPicIds.push(itinerary_medias.find({ // 然后根据头图id，查找出这篇游记的头图的所有信息
                where: {
                    mediaId: i.headPicId
                }
            }))
        })
        return Promise.all(headPicIds)
    })  
}

module.exports = queryMainPageSlideData;