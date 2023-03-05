const path = require('path');

const FILTER_MODES = {
  INCLUDE: 'include',
  EXCLUDE: 'exclude',
};

const CONFIG = {
  BATCH_MODE: process.env.BATCH,
  URL: process.env.URL,
  SCRAPER: process.env.SCRAPER,
  DOWNLOADER: process.env.DOWNLOADER,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  RESULT_DIR: process.env.RESULT_DIR || path.join(__dirname, '..', '..', 'tmp'),
  FILTER_EXTENSIONS: process.env.FILTER_EXTENSIONS || '',
  FILTER_EXTENSION_MODE: process.env.FILTER_EXTENSION_MODE || FILTER_MODES.INCLUDE,
};

module.exports = { CONFIG, FILTER_MODES };
