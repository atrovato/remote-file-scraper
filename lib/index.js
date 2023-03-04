const inputInformation = require('./input');
const { logger, printReport, buildReport } = require('./utils');
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

  try {
    logger.debug('Starting download with "%s"...', downloader.title);
    await downloader.download(files);
  } finally {
    logger.debug('Closing downloader...');
    await downloader.close();
  }

  return fileReport;
}

module.exports = run;
