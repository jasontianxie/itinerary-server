const Sequelize = require('sequelize');
const sequelize = new Sequelize('itinerary', 'root', '123456ABCabc', {
  host: 'localhost',
  dialect: 'mysql',

  port:3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // 仅限 SQLite
  storage: 'path/to/database.sqlite',

  // 请参考 Querying - 查询 操作符 章节
  operatorsAliases: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {sequelize,Sequelize};