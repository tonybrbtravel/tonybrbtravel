let triggers = [];
let initialised = false;

const init = () => {
  triggers = [];
  const elements = document.querySelectorAll('.simple-animate-in');
  for (let i = 0; i < elements.length; i++) {
    triggers.push({
      offset: elements[i].getBoundingClientRect().top + window.pageYOffset,
      left: elements[i].getBoundingClientRect().left,
      element: elements[i],
    });
  }
  triggers.sort((a, b) => a.offset - b.offset);
  if (!initialised) {
    window.addEventListener('scroll', update);
    window.addEventListener('resize', init);
    initialised = true;
  }
  window.setTimeout(update, 250);
};

const update = () => {
  while (triggers[0] && triggers[0].offset <= window.pageYOffset + window.innerHeight) {
    const offset = triggers[0].offset;
    let stagger = 0;
    while (triggers[0] && triggers[0].offset === offset) {
      triggerAnimation(triggers[0].element, stagger++);
      triggers.shift();
    }
  }
};

const triggerAnimation = (element, stagger) => {
  window.setTimeout(() => {
    element.classList.add('simple-animate-in-triggered')
  }, stagger * 50);
  element.addEventListener('animationend', removeAnimation);
};

const removeAnimation = (event) => {
  event.target.classList.remove('simple-animate-in');
  event.target.classList.remove('simple-animate-in-triggered');
  event.target.removeEventListener('animationend', removeAnimation);
};

export default { init };
