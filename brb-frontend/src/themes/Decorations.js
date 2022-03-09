import Colors from './Colors';

const Decorations = {
  shadow: {
    default: '2px 2px 6px rgba(0, 0, 0, .5)',
    light: '4px 4px 10px rgba(0, 0, 0, .15)',
    heavy: '2px 2px 5px rgba(0, 0, 0, .75)',
    detail: '1px 1px 3px rgba(0, 0, 0, .5)',
  },

  glow: {
    brbPink: `0 0 5px ${Colors.brbPink}, 0 0 15px ${Colors.brbPink}`,
  },

  transition: {
    default: '250ms',
    slow: '750ms',
  },
};

export default Decorations;
