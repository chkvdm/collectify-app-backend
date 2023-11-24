import dotenv from 'dotenv';
dotenv.config();

const config = {
  secretKey: process.env.SECRET_KEY,
  database: process.env.MYSQL_DATABASE,
  dbUser: process.env.MYSQL_USER,
  dbPassword: process.env.MYSQL_PASSWORD,
  dbHost: process.env.HOST,
  dialect: process.env.DIALECT,
  port: process.env.PORT,
  cloudNname: process.env.CLOUD_NAME,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  elasticNode: process.env.ELASTIC_NODE,
  elasticApiKey: process.env.ELASTIC_API_KEY,
};

export default config;
