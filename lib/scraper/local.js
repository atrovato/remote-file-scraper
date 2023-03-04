const fs = require('fs/promises');
const { fileURLToPath } = require('url');

const { logger } = require('../utils');

/**
 * Scrap Archive.org URL list.
 *
 * @param {string} url - The URL to parse.
 * @example
 * const files = await scrap({ href: '~/tmp' });
 */
async function scrap(url) {
  const filePath = fileURLToPath(url);
  logger.debug('Loading local file "%s"', url.href);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const files = JSON.parse(fileContent);
  logger.debug(`${files.length} loaded`);
  return files;
}

module.exports = { title: 'Local file', key: 'local', scrap };
