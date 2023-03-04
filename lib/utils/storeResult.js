const fs = require('fs/promises');
const path = require('path');

const { logger } = require('./logger');

/**
 * Stores the result.
 *
 * @param {string} resultDir - Path to create result file.
 * @param {Array} files - Scraped files.
 * @returns {string} The file path where result are stored.
 * @example
 * await storeResult(url, [...]);
 */
async function storeResult(resultDir, files) {
  const resultFile = path.join(resultDir, 'scraped.json');
  await fs.writeFile(resultFile, JSON.stringify(files, undefined, 2));
  logger.info('Process result file: %s', resultFile);
  return resultFile;
}

module.exports = { storeResult };
