const yaml = require('js-yaml');
const htmlmin = require('html-minifier');
const i18n = require('./i18n');
const translations = require('./src/i18n');

const DEFAULT_LANGUAGE = 'en';
const LANGUAGES = [DEFAULT_LANGUAGE, 'es', 'zh'];

module.exports = (config) => {
  // Custom i18n filter
  config.addFilter('i18n', (key, page, data, localeOverride) => {
    const pluginOptions = {
      translations,
      languages: LANGUAGES,
      defaultLanguage: DEFAULT_LANGUAGE,
    };

    return i18n(key,
      data,
      localeOverride,
      pluginOptions,
      page,
    );
  });

  // Helper for generate the href url & permalink following the localization
  config.addFilter('localizationUrl', (value) => {
    return value === DEFAULT_LANGUAGE ? '/' : `/${value}/`;
  });

  // Needed to prevent eleventy from ignoring changes to our
  // template files since they are in our `.gitignore`
  config.setUseGitIgnore(false);

  // Allow eleventy to understand yaml files
  // mostly because we want comments support in data file.
  config.addDataExtension('yml', (contents) => yaml.safeLoad(contents));

  // Pass-through files
  config.addPassthroughCopy({
    'src/misc/favicon.png': 'favicon.png',
    'src/misc/robots.txt': 'robots.txt',
    'src/misc/admin': 'admin'
  });

  // Minify eleventy pages in production
  if (process.env.NODE_ENV === 'production') {
    config.addTransform('html-min', (content, outputPath) =>
      outputPath.endsWith('.html') ?
      htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }) :
      content
    );
  }

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes/partials',
      layouts: '_includes/layouts'
    }
  };
};
