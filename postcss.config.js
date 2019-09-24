const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');

const postcssConfig = [
  flexbugsFixes,
  autoprefixer({
    flexbox: true,
  }),
];

module.exports = {
  plugins: postcssConfig,
};
