const path = require('path');

module.exports = {
  PATHS: {
    src: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../build'),
    public: path.join(__dirname, '../public'),
    devPublic: path.join(__dirname, '../src/assets'),
  },
  MARKUP_PATHS: {
    outputPath: path.resolve(__dirname, '../', 'markup_dist'),
    inputPath: path.resolve(__dirname, '../', 'markup_src'),
    rootPath: path.resolve(__dirname, '../', ''),
  },
};
