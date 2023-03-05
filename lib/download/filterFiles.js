const path = require('path');
const { logger } = require('../utils');

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
  const { extensionInclude = [] } = filters;

  let result = [...files];
  if (extensionInclude.length !== 0) {
    logger.info('Apply extension filter: %j', extensionInclude);
    result = result.filter((file) => {
      let fileExt = path.extname(file.url);
      if (fileExt.length === '') {
        fileExt = '<none>';
      }
      return extensionInclude.includes(fileExt);
    });
  }

  return result;
}

module.exports = { filterFiles };
