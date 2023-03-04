const { logger } = require('../utils');

/**
 * Scrap Archive.org URL list.
 *
 * @param {string} url - The URL to parse.
 * @example
 * await scrap('https://archive.org/my-path');
 */
function scrap(url) {
  logger.info('...Archive.org: %s', url);
}

module.exports = { title: 'Archive.org', key: 'archive', scrap, disabled: true };
