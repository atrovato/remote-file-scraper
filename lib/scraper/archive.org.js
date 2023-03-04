const { logger } = require('../utils');

/**
 * Scrap Archive.org URL list.
 *
 * @param {string} url - The URL to parse.
 * @example
 * await scrap({ href: 'https://archive.org/my-path' });
 */
function scrap(url) {
  logger.debug('...Archive.org: %s', url);
  throw new Error('Archive.org not impleted yet');
}

module.exports = { title: 'Archive.org', key: 'archive', scrap, disabled: true };
