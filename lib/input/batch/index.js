const { readScraper } = require('./readScraper');
const { readUrl } = require('./readUrl');
const { readDownloader } = require('./readDownloader');

/**
 * Read data from environment variables.
 *
 * @returns {object} The config from env variables.
 * @example
 * const { url, scraper, ... } = await batchInput();
 */
async function batchInput() {
  const url = readUrl();
  const scraper = readScraper();
  const downloader = readDownloader();
  return { url, scraper, downloader };
}

module.exports = batchInput;
