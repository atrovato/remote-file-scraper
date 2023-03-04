const { CONFIG } = require('../../utils');

/**
 * Load and check URL from environment variable.
 *
 * @returns {URL} URL from variable.
 * @example
 * const url = readUrl();
 */
function readUrl() {
  if (!CONFIG.URL) {
    throw new Error('URL variable is not provided');
  }

  try {
    return new URL(CONFIG.URL);
  } catch (e) {
    throw new Error('URL variable is not valid');
  }
}

module.exports = { readUrl };