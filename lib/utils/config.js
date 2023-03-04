const path = require('path');

const CONFIG = {
  BATCH_MODE: process.env.BATCH,
  URL: process.env.URL,
  SCRAPER: process.env.SCRAPER,
  DOWNLOADER: process.env.DOWNLOADER,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  RESULT_DIR: process.env.RESULT_DIR || path.join(__dirname, '..', '..', 'tmp'),
};

module.exports = { CONFIG };
