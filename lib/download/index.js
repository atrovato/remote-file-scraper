const pyload = require('./pyload');

const DL_LIST = [pyload];

const DOWNLOADERS = DL_LIST.map((kind) => {
  const { title, disabled, description, key } = kind;
  return { title, disabled, description, value: kind, key };
});

module.exports = { DOWNLOADERS };
