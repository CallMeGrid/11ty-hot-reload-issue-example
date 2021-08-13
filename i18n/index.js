'use strict';

const templite = require('templite');
const get = require('lodash.get');

module.exports = function (
  key,
  data = {},
  localeOverride,
  pluginOptions = {},
  page,
) {

  const {
    translations = {},
    languages = [],
    defaultLanguage,
  } = pluginOptions;

  if (!defaultLanguage) {
    console.error(
      '[i18n] Please define a default language it will be use as fallback language.'
    );
  }


  const fallbackLocales = { '*': defaultLanguage };

  // Use explicit `locale` argument if passed in, otherwise infer it from URL prefix segment
  const url = get(page, 'url', '');
  const contextLocale = url.split('/')[1];

  let locale = defaultLanguage;

  if (localeOverride) {
    locale = localeOverride;
  }

  if (languages.includes(contextLocale)) {
    locale = contextLocale;
  }

  // Preferred translation
  const translation = get(translations, `[${locale}][${key}]`);

  if (translation !== undefined) {
    return templite(translation, typeof data === 'string' ? JSON.parse(data) : data);
  }

  // Fallback translation
  const fallbackLocale = get(fallbackLocales, locale) || get(fallbackLocales, '*');

  const fallbackTranslation = get(translations, `[${fallbackLocale}][${key}]`);

  if (fallbackTranslation !== undefined) {
    console.warn(
      `[i18n] Could not find '${key}' in '${locale}'. Using '${fallbackLocale}' fallback.`
    );
    return templite(fallbackTranslation, data);
  }

  // Not found
  console.error(
    `[i18n] Translation for '${key}' in '${locale}' not found. No fallback locale specified.`
  );
  return key;
};
