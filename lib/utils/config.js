// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const path = require('path');

const CONFIG = {
  BATCH_MODE: process.env.BATCH,
  URL: process.env.URL,
  KIND: process.env.KIND,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  RESULT_DIR: process.env.RESULT_DIR || path.join(__dirname, '..', '..', 'tmp'),
};

module.exports = { CONFIG };
