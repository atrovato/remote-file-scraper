const inputInformation = require('./input');
const { continueDownload } = require('./input/user/continueDownload');
const { logger, printReport, buildReport, CONFIG } = require('./utils');
const { storeResult } = require('./utils/storeResult');

/**
 * Start the main application.
 *
 * @example
 * await run()
 */
async function run() {
  // Reset terminal
  logger.info('Welcome to the remote file scraper utility!');
  logger.info('To use it, simply aswer to questions.');
  logger.info('Have fun!');

  const { url, scraper, downloader, resultDir } = await inputInformation();

  logger.info('Starts scraping with "%s" on %s...', scraper.title, url.href);
  const files = await scraper.scrap(url);
  await storeResult(resultDir, files);

  const fileReport = buildReport(files);
  printReport(fileReport);

  const startDownload = CONFIG.BATCH_MODE || (await continueDownload(fileReport));
  if (startDownload) {
    try {
      logger.info('Starts downloading with "%s"...', downloader.title);
      await downloader.download(files);
    } finally {
      logger.debug('Closing downloader...');
      await downloader.close();
    }
  } else {
    logger.warn('Download phase is ignored');
  }

  return fileReport;
}

module.exports = run;
