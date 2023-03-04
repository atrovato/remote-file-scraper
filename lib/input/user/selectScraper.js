const prompts = require('prompts');

const { SCRAPERS } = require('../../scraper');
const { CONFIG } = require('../../utils');
const { quit } = require('./quit');

/**
 * Interactive scraper of scraping selector.
 *
 * @example
 * await selectScraper()
 */
async function selectScraper() {
  let initial;

  if (CONFIG.SCRAPER) {
    initial = SCRAPERS.findIndex((scraperScraper) => scraperScraper.key === CONFIG.SCRAPER);
  }

  const question = {
    type: 'select',
    name: 'scraper',
    message: 'Select the scraper to use',
    choices: SCRAPERS,
    warn: 'This scraper is not available yet',
    initial: Math.max(0, initial),
  };

  const { scraper } = await prompts(question, { onCancel: quit });
  return scraper;
}

module.exports = { selectScraper };
