module.exports = require('whiteboard-importer')(
  require('path').join(__dirname, 'src/sass'),
  [require('whiteboard-media')]
);
