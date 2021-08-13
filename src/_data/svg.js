const fs = require('fs');

function readSVG(filename) {
  return fs.readFileSync(process.cwd() + '/src/_assets/svg/' + filename, {
    encoding: 'utf8'
  });
}

module.exports = {
  arrow_right: readSVG('ui/arrow-right.svg'),
  ext_link: readSVG('ui/external-link.svg'),
  download: readSVG('ui/download.svg')
};
