const axios = require('axios');

/**
 * Close Download Station downloader.
 *
 * @param {object} config - Client configuration.
 * @example
 * const config = await close();
 */
async function close(config) {
  const { downloadUrl, authInfo, sessionId } = config;
  await axios.get(`${downloadUrl}/webapi/${authInfo.path}`, {
    params: {
      api: authInfo.api,
      version: authInfo.maxVersion,
      method: 'logout',
      session: 'DownloadStation',
      _sid: sessionId,
    },
  });
}

module.exports = { close };
