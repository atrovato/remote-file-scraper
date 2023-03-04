const fs = require('fs/promises');
const path = require('path');
const moment = require('moment');

const { CONFIG } = require('./config');
const { logger } = require('./logger');

/**
 * Stores the result.
 *
 * @param {URL} url - Scraped url.
 * @param {Array} files - Scraped files.
 * @returns {string} The file path where result are stored.
 * @example
 * await storeResult(url, [...]);
 */
async function storeResult(url, files) {
  const resultDir = path.join(CONFIG.RESULT_DIR, url.hostname);
  await fs.mkdir(resultDir, { recursive: true });
  const now = moment();
  const filename = `scrap_${now.format('YYYYMMDD_hhmmss')}.json`;
  const resultFile = path.join(CONFIG.RESULT_DIR, url.hostname, filename);
  await fs.writeFile(resultFile, JSON.stringify(files, undefined, 2));
  logger.info('Process result file: %s', resultFile);
  return resultFile;
}

module.exports = { storeResult };
