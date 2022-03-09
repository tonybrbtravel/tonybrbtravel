const plans = [
  {
    id: 3,
    name: 'Pay single trip',
    emoji: '✌️',
    emojiSize: '72px',
    price: 200,
    flightTickets: 1,
    text: 'Only pay for your group trip. No subscription!',
    single: true,
  },
  {
    id: 1,
    name: 'Go Solo',
    emoji: '💃',
    emojiSize: '72px',
    price: 49.99,
    flightTickets: 1,
    text:
      'Perfect for solo travelers, or groups who want to subscribe individually',
  },
  {
    id: 2,
    name: 'Go Together',
    emoji: '🤜🤛',
    emojiSize: '58px',
    price: 89.99,
    flightTickets: 2,
    text:
      'Great for couples and those always travelling with a +1, but you don’t have to take the same person each time.',
    couple: true,
  },
];

export default plans;
