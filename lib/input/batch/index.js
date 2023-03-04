const { readScraper } = require('./readScraper');
const { readUrl } = require('./readUrl');

/**
 * Read data from environment variables.
 *
 * @returns {object} The config from env variables.
 * @example
 * const { url, scraper, ... } = batchInput();
 */
function batchInput() {
  const url = readUrl();
  const scraper = readScraper();
  return { url, scraper };
}

module.exports = batchInput;
