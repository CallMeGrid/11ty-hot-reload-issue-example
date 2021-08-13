import * as cls from './class-toggles';

const htmlEl = document.querySelector('html');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

export default () => {
  navToggle.onclick = function() {
    cls.toggleClass(navMenu, 'open');
    cls.toggleClass(navToggle, 'open');
    cls.toggleClass(htmlEl, 'no-overflow');
  };
};
