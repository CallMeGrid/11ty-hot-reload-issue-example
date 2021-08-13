# Run the project
```
$ npm install
$ npm run start
```
Open (http://localhost:8080/)[http://localhost:8080/]

# Reproduce the issue

Open `scr/i18n/en/index.js` edit the `hello` property save, then the terminal should diplay some logs
```
[Browsersync] Reloading Browsers...
[start:eleventy] File changed: src/i18n/en/index.js
[start:eleventy] Writing dist/index.html from ./src/content/home.liquid.
[start:eleventy] Copied 4 files / Wrote 1 file in 0.04 seconds (v0.11.1)
```

Go on the browser, the label is still the old one, refresh the browser still the old one.


But if you do this, open `scr/i18n/en/index.js` edit the `hello` property save, open `.eleventy.js` save, then the terminal should diplay some logs

```
 Watching…
[start:eleventy] [Browsersync] Reloading Browsers...
[start:eleventy] File changed: .eleventy.js
[start:eleventy] Writing dist/index.html from ./src/content/home.liquid.
[start:eleventy] Copied 4 files / Wrote 1 file in 0.03 seconds (v0.11.1)
```

Go on the browser, the label is the new one.
