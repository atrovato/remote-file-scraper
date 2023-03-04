/**
 * Configure downloader.
 *
 * @param {object} downloader - Once to configure.
 * @param {object} options - Process options.
 * @returns {object} Configured downloader.
 * @example
 * const configuredDownloader = await configureDownloader({ ... });
 */
async function configureDownloader(downloader, options) {
  const downloaderConfig = await downloader.configure(options);
  return {
    ...downloader,
    download: (files) => downloader.download(files, downloaderConfig),
    close: () => downloader.close(downloaderConfig),
  };
}

module.exports = { configureDownloader };
