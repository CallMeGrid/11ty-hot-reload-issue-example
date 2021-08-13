const DEFAULT_LANGUAGE = 'en';
const LANGUAGES = [DEFAULT_LANGUAGE, 'es', 'zh'];
const LANG_KEY = 'lang';

/**
 * Method to determine which language we should display to the user
 * following his navigator language.
 */
export default () => {
  // The function will be run once the DOM is loaded
  window.addEventListener('DOMContentLoaded', () => {
    // Get the navigator user language
    const userLanguage = window.navigator.userLanguage || window.navigator.language;
    // If the user has already been redirected to the good language, we don't need to
    // redirect it again.
    if (!sessionStorage.getItem(LANG_KEY)) {
      LANGUAGES.forEach((language) => {
        // If the language en-US or es-MX is part of the language supported we redirect
        // to the best option we support en or es, else we show the default language
        if (language.includes(userLanguage)) {
          // Get the current pathname and remove thr language code from the pathname
          // if not default language. e.g. '/es/dev' -> '/dev'
          let pathname = window.location.pathname;
          if (LANGUAGES.some((lang) => pathname.includes(lang))) {
            pathname = pathname.split('/').splice(2).join('/');
          }
          // Set the "lang" value in the session storage and redirect
          sessionStorage.setItem(LANG_KEY, language);
          window.location = language === DEFAULT_LANGUAGE ?
            `/${pathname}` : `/${language}/${pathname}`;
        }
      });
    }
  });
};
