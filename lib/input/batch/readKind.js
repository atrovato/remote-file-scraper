const { KINDS } = require('../../scraper');
const { CONFIG } = require('../../utils');

/**
 * Load and check kind from environment variable.
 *
 * @returns {object} Kind from .env file.
 * @example
 * const kind = readKind();
 */
function readKind() {
  if (!CONFIG.KIND) {
    throw new Error('KIND variable is not provided');
  }

  const kind = KINDS.find((scraperKind) => scraperKind.key === CONFIG.KIND);

  if (!kind) {
    throw new Error('KIND variable is not valid');
  }

  return kind.value;
}

module.exports = { readKind };
