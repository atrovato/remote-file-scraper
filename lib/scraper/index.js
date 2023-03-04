const apache = require('./apache');
const archiveOrg = require('./archive.org');
const local = require('./local');

const SCRAPER_LIST = [apache, archiveOrg, local];

const SCRAPERS = SCRAPER_LIST.map((scraper) => {
  const { title, disabled, description, key } = scraper;
  return { title, disabled, description, value: scraper, key };
});

module.exports = { SCRAPERS };
