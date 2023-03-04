const { SCRAPERS } = require('../../scraper');
const { CONFIG } = require('../../utils');

/**
 * Load and check scraper from environment variable.
 *
 * @returns {object} Scraper from .env file.
 * @example
 * const scraper = readScraper();
 */
function readScraper() {
  if (!CONFIG.SCRAPER) {
    throw new Error('SCRAPER variable is not provided');
  }

  const scraper = SCRAPERS.find((scraperScraper) => scraperScraper.key === CONFIG.SCRAPER);

  if (!scraper) {
    throw new Error('SCRAPER variable is not valid');
  }

  return scraper.value;
}

module.exports = { readScraper };
