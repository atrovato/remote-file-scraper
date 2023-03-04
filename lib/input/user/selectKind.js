const prompts = require('prompts');

const { KINDS } = require('../../scraper');
const { CONFIG, quit } = require('../../utils');

/**
 * Interactive kind of scraping selector.
 *
 * @example
 * await selectKind()
 */
async function selectKind() {
  let initial;

  if (CONFIG.KIND) {
    initial = KINDS.findIndex((scraperKind) => scraperKind.key === CONFIG.KIND);
  }

  const question = {
    type: 'select',
    name: 'kind',
    message: 'Enter the kind of page to scrap',
    choices: KINDS,
    warn: 'This kind is not available yet',
    initial,
  };

  const { kind } = await prompts(question, { onCancel: quit });
  return kind;
}

module.exports = { selectKind };
