// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const CONFIG = {
  BATCH_MODE: process.env.BATCH,
  URL: process.env.URL,
  KIND: process.env.KIND,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

module.exports = { CONFIG };
