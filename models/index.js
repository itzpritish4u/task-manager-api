const { Sequelize } = require('sequelize');
// const dotenv = require('dotenv');
const dbConfig = require('../config/config');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize);
db.Task= require('./task')(sequelize);

module.exports = db;
