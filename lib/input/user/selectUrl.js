const prompts = require('prompts');

const { CONFIG } = require('../../utils');
const { quit } = require('./quit');

/**
 * Interactive URL input.
 *
 * @example
 * await selectUrl()
 */
async function selectUrl() {
  const question = {
    type: 'text',
    name: 'url',
    message: 'Enter the URL to scrap',
    initial: CONFIG.URL,
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
  return new URL(url);
}

module.exports = { selectUrl };
