const { getFileExtension } = require('./getFileExtension');

/**
 * Generate a report from list of files.
 *
 * @param {Array} files - Scrapped files.
 * @returns {object} The report with statistics on all files.
 * @example
 * const report = buildReport([{url: 'http://file1', name: 'file1', ...}])
 */
function buildReport(files) {
  const extensions = {};
  let globalSize = 0;

  files.forEach((file) => {
    const { url, size } = file;
    const extension = getFileExtension(url);

    // Init extension report
    if (!extensions[extension]) {
      extensions[extension] = { files: [], size: 0, ext: extension };
    }

    extensions[extension].files.push(file);
    extensions[extension].size += size;
    globalSize += size;
  });

  return { files, extensions, size: globalSize };
}

module.exports = { buildReport };
