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

  const scraper = SCRAPERS.find((availableScraper) => availableScraper.key === CONFIG.SCRAPER);

  if (!scraper) {
    throw new Error('SCRAPER variable is not valid');
  }

  if (scraper.disabled) {
    throw new Error(`SCRAPER "${CONFIG.SCRAPER}" is disabled for now`);
  }

  return scraper.value;
}

module.exports = { readScraper };
