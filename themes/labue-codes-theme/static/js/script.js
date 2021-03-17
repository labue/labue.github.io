const typeEffect = (element, config) => {
  let delay = {
    between: 500,
    erase: 100,
    next: 2000,
    type: 250,
  };
  let terms = ['make', 'sure', 'you', 'add', 'terms'];
  let cursor;
  let indexChar = 0;
  let indexTerm = 0;

  const type = () => {
    if (indexChar < terms[indexTerm].length) {
      if (!cursor.classList.contains('typing')) {
        cursor.classList.add('typing');
      }
      cursor.textContent += terms[indexTerm].charAt(indexChar);
      indexChar += 1;
      setTimeout(type, delay.type);
    } else {
      cursor.classList.remove('typing');
      setTimeout(erase, delay.next);
    }
  };

  const erase = () => {
    if (indexChar > 0) {
      if (!cursor.classList.contains('typing')) {
        cursor.classList.add('typing');
      }
      cursor.textContent = terms[indexTerm].substring(0, indexChar - 1);
      indexChar -= 1;
      setTimeout(erase, delay.erase);
    } else {
      cursor.classList.remove('typing');
      indexTerm += 1
      if (indexTerm >= terms.length) {
        indexTerm = 0;
      }
      setTimeout(type, delay.between);
    }
  };

  return (() => {
    cursor = document.createElement('span');
    element.appendChild(cursor);
    cursor.classList.add('cursor');

    if (config.delay) {
      delay = Object.assign(delay, config.delay);
    }
    if (config.terms) {
      terms = config.terms;
    }
    setTimeout(type);
  })();
};

document.addEventListener('DOMContentLoaded', function () {
  const lc = window.lc || { typer: null };

  // Type effect elements
  if (lc.typer && lc.typer.length) {
    lc.typer.forEach((config) => {
      if (config.selector) {
        const element = document.querySelector(config.selector);
        typeEffect(element, config);
      }
    });
  }
});
