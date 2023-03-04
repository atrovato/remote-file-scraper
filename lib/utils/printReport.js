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
  const { extensions } = report;
  const exts = Object.values(extensions);
  if (exts.length !== 0) {
    const extLines = exts.map((extension) => {
      const { ext, size, files } = extension;
      return `${ext.padStart(7, ' ')}: ${`${files.length}`.padStart(5, ' ')} file(s) (${format(size)})`;
    });

    let reportDetailsLog = `Detailled report:${os.EOL}`;
    reportDetailsLog += `${exts.length} extensions:${os.EOL}`;
    reportDetailsLog += extLines.join(os.EOL);

    logger.debug(reportDetailsLog);
  }

  let reportLog = `Report:${os.EOL}`;
  reportLog += `  # of files: ${report.files.length}${os.EOL}`;
  reportLog += `  total size: ${format(report.size)}`;

  logger.info(reportLog);
}

module.exports = { printReport };
