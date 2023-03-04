const { selectUrl } = require('./selectUrl');
const { selectScraper } = require('./selectScraper');
const { selectDownloader } = require('./selectDownloader');

/**
 * Interactive mode: user must fill information.
 *
 * @example
 * const { url, scraper, ... } = await userInput();
 */
async function userInput() {
  const url = await selectUrl();
  const scraper = await selectScraper();
  const downloader = await selectDownloader();
  return { url, scraper, downloader };
}

module.exports = userInput;
