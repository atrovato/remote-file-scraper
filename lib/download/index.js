const filelist = require('./filelist');
const pyload = require('./pyload');

const DL_LIST = [filelist, pyload];

const DOWNLOADERS = DL_LIST.map((downloader) => {
  const { title, disabled, description, key } = downloader;
  return { title, disabled, description, value: downloader, key };
});

module.exports = { DOWNLOADERS };
