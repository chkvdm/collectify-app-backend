import Sequelize from 'sequelize';
import config from '../../config.js';

const sequelize = new Sequelize(
  config.database,
  config.dbUser,
  config.dbPassword,
  {
    dialect: config.dialect,
    host: config.dbHost,
    port: config.dbPort,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('MySQL connection successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

export default sequelize;
