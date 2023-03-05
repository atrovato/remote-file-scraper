const path = require('path');

/**
 * Retrieve the file extension, or "<none>" if empty.
 *
 * @param {string} filename - The file name.
 * @returns {string} The file extension, or "<none>" if empty.
 * @example
 * const extension = getFileExtension('myfile.txt');
 */
function getFileExtension(filename) {
  const fileExt = path.extname(filename).toLowerCase();

  if (fileExt.length === '') {
    return '<none>';
  }

  return fileExt;
}

module.exports = { getFileExtension };
