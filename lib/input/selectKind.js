const prompts = require('prompts');

const { KINDS } = require('../scraper');
const { quit } = require('../utils');

/**
 * Interactive kind of scraping selector.
 *
 * @example
 * await selectKind()
 */
async function selectKind() {
  const question = {
    type: 'select',
    name: 'kind',
    message: 'Enter the kind of page to scrap',
    choices: KINDS,
    warn: 'This kind is not available yet',
  };

  const { kind } = await prompts(question, { onCancel: quit });
  return kind;
}

module.exports = { selectKind };
