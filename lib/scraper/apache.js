/**
 * Scrap Apache URL list.
 *
 * @param {string} url - The URL to parse.
 * @example
 * await scrap('https://apache-file-list.org');
 */
function scrap(url) {
  console.log('... apache', url);
}

module.exports = { title: 'Apache', scrap };
