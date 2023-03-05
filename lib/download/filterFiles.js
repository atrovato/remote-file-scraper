const { logger, getFileExtension } = require('../utils');
const { FILTER_MODES, CONFIG } = require('../utils/config');

/**
 * Apply filters on scraped files.
 *
 * @param {Array} files - Scraped files.
 * @param {object} filters - Filters to apply.
 * @returns {Array} Filtered list of files.
 * @example
 * const filteredFiles = filterFiles({ files: [...] }, { filters });
 */
function filterFiles(files, filters = {}) {
  const { filteredExtensions = [] } = filters;

  let result = [...files];
  if (filteredExtensions.length !== 0) {
    logger.info('Apply extension filter: %j, with "%s" mode', filteredExtensions, CONFIG.FILTER_EXTENSION_MODE);
    result = result.filter((file) => {
      const fileExt = getFileExtension(file.url);

      // eslint-disable-next-line no-bitwise
      return (CONFIG.FILTER_EXTENSION_MODE === FILTER_MODES.EXCLUDE) ^ filteredExtensions.includes(fileExt);
    });
  }

  return result;
}

module.exports = { filterFiles };
