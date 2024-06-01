const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    DB_NAME='ecommerce_db',
    DB_PASSWORD='postgres',
    DB_USER='Dxsxxd1124!',
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
}

module.exports = sequelize;