const path = require('path');
const fs = require('fs/promises');
const moment = require('moment');

const { CONFIG, logger } = require('../utils');
const batchInput = require('./batch');
const userInput = require('./user');
const { configureDownloader } = require('../download/configureDownloader');

/**
 * Select or ask all requested information.
 *
 * @example
 * await inputInformation()
 */
async function inputInformation() {
  let info;
  if (CONFIG.BATCH_MODE) {
    logger.debug('Entering batch mode...');
    info = await batchInput();
  } else {
    logger.debug('> Entering interactive mode...');
    info = await userInput();
  }

  const now = moment();
  const processName = info.url.hostname.length === 0 ? info.scraper.key : info.url.hostname;
  const resultDir = path.join(CONFIG.RESULT_DIR, processName, now.format('YYYYMMDD_HHmmss'));
  await fs.mkdir(resultDir, { recursive: true });
  const configuredDownloader = await configureDownloader(info.downloader, { resultDir });
  return { ...info, downloader: configuredDownloader, resultDir };
}

module.exports = inputInformation;
