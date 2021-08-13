import * as cls from './class-toggles';

const questions = document.querySelectorAll('.faqs-q');

export default () => {
  questions.forEach((question) => {
    question.onclick = function() {
      cls.toggleClass(question, 'active');
    };
  });
};
