const prompts = require('prompts');

const { quit } = require('../utils');

/**
 * Interactive URL input.
 *
 * @example
 * await readUrl()
 */
async function readUrl() {
  const question = {
    type: 'text',
    name: 'url',
    message: 'Enter the URL to scrap',
    validate: (value) => {
      try {
        // eslint-disable-next-line no-new
        new URL(value);
        return true;
      } catch (e) {
        return 'Not a valid URL';
      }
    },
  };

  const { url } = await prompts(question, { onCancel: quit });
  return url;
}

module.exports = { readUrl };
