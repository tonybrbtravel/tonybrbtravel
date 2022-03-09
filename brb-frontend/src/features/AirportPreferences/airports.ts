const airports = [
  {
    region: 'London',
    airports: [
      {
        label: 'Heathrow',
        id: 1,
        code: 'LHR',
        coords: {
          id: 1,
          shape: 'circle',
          coords: [180, 313, 2],
          preFillColor: '#E94560',
        },
      },
      {
        label: 'Luton',
        code: 'LTN',
        id: 2,
        coords: {
          id: 2,
          shape: 'circle',
          coords: [183, 304, 2],
          preFillColor: '#E94560',
        },
      },
      {
        label: 'Stansted',
        code: 'STN',
        id: 3,
        coords: {
          id: 3,
          shape: 'circle',
          coords: [206, 296, 2],
          preFillColor: '#E94560',
        },
      },
      {
        label: 'Gatwick',
        code: 'LGW',
        id: 4,
        coords: {
          id: 4,
          shape: 'circle',
          coords: [194, 323, 2],
          preFillColor: '#E94560',
        },
      },
    ],
  },
  {
    region: 'Northern England',
    airports: [
      {
        label: 'Manchester',
        id: 5,
        code: 'MAN',
        coords: {
          id: 5,
          shape: 'circle',
          coords: [138, 235, 2],
          preFillColor: '#E94560',
        },
      },
      {
        label: 'Newcastle',
        code: 'NCL',
        id: 6,
        coords: {
          id: 6,
          shape: 'circle',
          coords: [149, 178, 2],
          preFillColor: '#E94560',
        },
      },
      {
        label: 'Liverpool John Lennon',
        code: 'LPL',
        id: 7,
        coords: {
          id: 7,
          shape: 'circle',
          coords: [115, 244, 2],
          preFillColor: '#E94560',
        },
      },
    ],
  },
  {
    region: 'West England & Wales',
    airports: [
      {
        label: 'Bristol',
        code: 'BRS',
        id: 8,
        coords: {
          id: 8,
          shape: 'circle',
          coords: [124, 328, 2],
          preFillColor: '#E94560',
        },
      },
    ],
  },
  {
    region: 'Scotland',
    airports: [
      {
        label: 'Edinburgh',
        code: 'EDI',
        id: 9,
        coords: {
          id: 9,
          shape: 'circle',
          coords: [126, 140, 2],
          preFillColor: '#E94560',
        },
      },
      {
        label: 'Glasgow',
        code: 'GLA',
        id: 10,
        coords: {
          id: 10,
          shape: 'circle',
          coords: [76, 143, 2],
          preFillColor: '#E94560',
        },
      },
    ],
  },
];

export default airports;
