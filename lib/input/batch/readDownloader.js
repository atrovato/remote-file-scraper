const { DOWNLOADERS } = require('../../download');
const { CONFIG } = require('../../utils');

/**
 * Load and check downloader from environment variable.
 *
 * @returns {object} Downloader from .env file.
 * @example
 * const scraper = readScraper();
 */
function readDownloader() {
  if (!CONFIG.DOWNLOADER) {
    throw new Error('DOWNLOADER variable is not provided');
  }

  const downloader = DOWNLOADERS.find((availableDownloader) => availableDownloader.key === CONFIG.DOWNLOADER);

  if (!downloader) {
    throw new Error('DOWNLOADER variable is not valid');
  }

  if (downloader.disabled) {
    throw new Error(`DOWNLOADER "${CONFIG.DOWNLOADER}" is disabled for now`);
  }

  return downloader.value;
}

module.exports = { readDownloader };
