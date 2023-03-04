const { readKind } = require('./readKind');
const { readUrl } = require('./readUrl');

/**
 * Read data from environment variables.
 *
 * @returns {object} The config from env variables.
 * @example
 * const { url, kind, ... } = batchInput();
 */
function batchInput() {
  const url = readUrl();
  const kind = readKind();
  return { url, kind };
}

module.exports = batchInput;
