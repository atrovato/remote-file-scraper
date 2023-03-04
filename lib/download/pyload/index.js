const { configure } = require('./configure');
const { download } = require('./download');
const { close } = require('./close');

module.exports = { title: 'pyLoad', key: 'pyload', configure, download, close, disabled: true };
