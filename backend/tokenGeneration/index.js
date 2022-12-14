require('dotenv').config();

const { PORT = 3000, JWT_SECRET = 'avada-kedavra' } = process.env;

const MONGOOSE_URL = 'mongodb://localhost:27017/mestodb';
const JWT_STORAGE_TIME = '7d';
const SALT_LENGTH = 10;

module.exports = {
  PORT,
  JWT_SECRET,
  MONGOOSE_URL,
  SALT_LENGTH,
  JWT_STORAGE_TIME,
};
