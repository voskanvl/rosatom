const pts = require("postcss-transform-shortcut");
// const postcssHasPseudo = require("css-has-pseudo");
const minmax = require("postcss-media-minmax");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
    plugins: [pts(), minmax(), postcssPresetEnv({ browsers: "last 3 versions" })],
};
