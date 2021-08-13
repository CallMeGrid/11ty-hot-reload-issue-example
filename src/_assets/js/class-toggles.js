// Class manipulation code for older browsers
// Reference: https://www.w3schools.com/jsref/prop_element_classlist.asp
// Reference: https://gist.github.com/jaredreich/971c43d9336dce7ade942b6a8acb2e6a

function ensureArray(value) {
  if (value.isArray) {
    return value;
  }
  if (value != null) {
    return [value];
  } else {
    return [];
  }
}

function addClass(elements, className) {
  if (elements == null) return;

  elements = ensureArray(elements);
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element.classList) {
      element.classList.add(className);
    } else {
      var arr = element.className.split(' ');
      if (arr.indexOf(className) == -1) {
        element.className += ' ' + className;
      }
    }
  }
}

function removeClass(elements, className) {
  if (elements == null) return;

  elements = ensureArray(elements);
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className
        .replace(new RegExp('(^|\\b)' + className.split(' ')
          .join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }
}

function toggleClass(elements, className) {
  if (elements == null) return;

  elements = ensureArray(elements);
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element.classList) {
      element.classList.toggle(className);
    } else {
      var classes = element.className.split(' ');
      var j = classes.indexOf(className);

      if (j >= 0) {
        classes.splice(j, 1);
      } else {
        classes.push(className);
        element.className = classes.join(' ');
      }
    }
  }
}

export {
  addClass,
  removeClass,
  toggleClass
};
