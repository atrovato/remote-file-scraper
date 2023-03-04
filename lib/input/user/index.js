const { selectUrl } = require('./selectUrl');
const { selectKind } = require('./selectKind');

/**
 * Interactive mode: user must fill information.
 *
 * @example
 * const { url, kind, ... } = await userInput();
 */
async function userInput() {
  const url = await selectUrl();
  const kind = await selectKind();

  return { url, kind };
}

module.exports = userInput;
