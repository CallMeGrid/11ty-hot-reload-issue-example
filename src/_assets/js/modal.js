import * as cls from './class-toggles';

/*+----------------------------------------------------------------------
 ||
 ||  Barebones Modal Functionality
 ||
 ||        Build a simple modal using only HTML data attributes.
 ||
 |+-----------------------------------------------------------------------
 ||
 ||   data-modal="name"          the modal to be opened
 ||   data-modal-open="name"     an open button for that modal
 ||   data-modal-close="name"    a close button for that modal
 ||
 ++-----------------------------------------------------------------------*/


const controller = new AbortController();

function toggleBodyScrolling(newState) {
  const htmlEl = document.querySelector('html');
  const bodyEl = document.body;

  // NOTE: We're not using toggleClass to ensure
  // open and close buttons behave as expected.
  if (newState === 'disable') {
    cls.addClass(htmlEl, 'modal-disable-scroll');
    cls.addClass(bodyEl, 'modal-disable-scroll');
  } else {
    cls.removeClass(htmlEl, 'modal-disable-scroll');
    cls.removeClass(bodyEl, 'modal-disable-scroll');
  }
}

function closeModal(modalName) {
  const modalEl = document.querySelector(`[data-modal='${modalName}']`);
  if (modalEl === null) return;

  cls.removeClass(modalEl, 'open');
  toggleBodyScrolling('enable');
  controller.abort();
}

function listenForEscape(e, modalName) {
  if (e.key === 'Escape') {
    closeModal(modalName);
  }
}

function openModal(modalName) {
  const modalEl = document.querySelector(`[data-modal='${modalName}']`);
  if (modalEl === null) return;

  cls.addClass(modalEl, 'open');
  toggleBodyScrolling('disable');
  document.addEventListener('keydown', (e) => listenForEscape(e, modalName), {
    signal: controller.signal
  });
}

export default () => {
  const modalOpenEls = document.querySelectorAll('[data-modal-open]');
  const modalCloseEls = document.querySelectorAll('[data-modal-close]');

  modalOpenEls.forEach((modalOpenEl) => {
    modalOpenEl.onclick = function() {
      const modalName = modalOpenEl.dataset.modalOpen;
      openModal(modalName);
    };
  });

  modalCloseEls.forEach((modalCloseEl) => {
    modalCloseEl.onclick = function() {
      const modalName = modalCloseEl.dataset.modalClose;
      closeModal(modalName);
    };
  });

};
