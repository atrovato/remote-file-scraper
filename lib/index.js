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

  const { url, kind } = await inputInformation();

  logger.info('Starts scraping with "%s" on %s...', kind.title, url.href);
  const files = await kind.scrap(url);
  await storeResult(url, files);

  const fileReport = buildReport(files);
  printReport(fileReport);

  return fileReport;
}

module.exports = run;
