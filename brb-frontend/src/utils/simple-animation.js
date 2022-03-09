let triggers = [];
let initialised = false;

const removeAnimation = (event) => {
  event
    .target
    .classList
    .remove('simple-animate-in');
  event
    .target
    .classList
    .remove('simple-animate-in-triggered');
  event
    .target
    .removeEventListener('animationend', removeAnimation);
};

const triggerAnimation = (element, stagger) => {
  window.setTimeout(() => {
    element
      .classList
      .add('simple-animate-in-triggered');
  }, stagger * 250);
  element.addEventListener('animationend', removeAnimation);
};

const update = () => {
  while (triggers[0] && triggers[0].offset <= window.pageYOffset + window.innerHeight) {
    const [{ offset }] = triggers;
    let stagger = 0;
    while (triggers[0] && triggers[0].offset === offset) {
      triggerAnimation(triggers[0].element, stagger);
      stagger += 1;
      triggers.shift();
    }
  }
};

const init = (repeatCall) => {
  if (!initialised) {
    window.addEventListener('scroll', update);
    window.addEventListener('resize', init);
    initialised = true;
  }

  triggers = [];

  const elements = document.querySelectorAll('.simple-animate-in');

  for (let i = 0; i < elements.length; i++) {
    triggers.push({
      offset: elements[i]
        .getBoundingClientRect()
        .top + window.pageYOffset,
      left: elements[i]
        .getBoundingClientRect()
        .left,
      element: elements[i],
    });
  }

  triggers.sort((a, b) => a.offset - b.offset);

  if (!repeatCall) {
    // TODO: Leverage layout shift observation instead of this clunky approach?
    window.setTimeout(() => init(true), 1000);
    window.setTimeout(() => init(true), 2000);
    window.setTimeout(() => init(true), 5000);
  }

  window.setTimeout(update, 250);
};

// Whole bunch of inits, since page layout can apparently change at several
// points, and isn't guaranteed to be locked at EITHER normal loading event
window.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', init);

export default { init };
