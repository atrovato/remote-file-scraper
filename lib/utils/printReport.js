const os = require('os');
const { sizeFormatter } = require('human-readable');

const format = sizeFormatter();

const { logger } = require('./logger');

/**
 * Prints the report from list of files.
 *
 * @param {object} report - Report from scrapped files.
 * @example
 * printReport({ ... });
 */
function printReport(report) {
  let reportLog = `Report:${os.EOL}`;

  const { extensions } = report;
  const exts = Object.values(extensions);
  if (exts.length !== 0) {
    reportLog += `  ${exts.length} extensions:${os.EOL}`;

    exts.forEach((extension) => {
      const { ext, size, files } = extension;
      reportLog += `${ext.padStart(10, ' ')}: ${`${files.length}`.padStart(5, ' ')} file(s) (${format(size)})${os.EOL}`;
    });
    reportLog += `  --------------------------${os.EOL}`;
  }
  reportLog += `  # of files: ${report.files.length}${os.EOL}`;
  reportLog += `  total size: ${format(report.size)}${os.EOL}`;

  logger.debug(reportLog);
}

module.exports = { printReport };
