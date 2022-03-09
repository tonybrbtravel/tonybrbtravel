const airports = [
  {
    region: 'London',
    airports: [
      {
        label: 'London Heathrow Airport',
        code: 'LHR',
        coords: {
          id: 1,
          shape: 'circle',
          coords: [173, 338, 2],
          preFillColor: '#E94560',
        },
      },
      {
        label: 'London Gatwick Airport',
        code: 'LGW',
        coords: {
          id: 3,
          shape: 'circle',
          coords: [166, 353, 2],
          preFillColor: '#E94560',
        },
      },
      {
        label: 'London Stansted Airport',
        code: 'STN',
        coords: {
          id: 2,
          shape: 'circle',
          coords: [185, 311, 2],
          preFillColor: '#E94560',
        },
      },
      {
        label: 'London Luton Airport',
        code: 'LTN',
        coords: {
          id: 7,
          shape: 'circle',
          coords: [160, 318, 2],
          preFillColor: '#E94560',
        },
      },
      { label: 'London Southend Airport', code: 'SEN' },
    ],
  },
  {
    region: 'Midlands',
    airports: [
      { label: 'Birmingham International Airport', code: 'BHX' },
      { label: 'East Midlands Airport', code: 'EMA' },
    ],
  },
  {
    region: 'Northern England',
    airports: [
      {
        label: 'Manchester Airport',
        code: 'MAN',
        coords: {
          id: 4,
          shape: 'circle',
          coords: [119, 261, 2],
          preFillColor: '#E94560',
        },
      },
      {
        label: 'Newcastle Airport',
        code: 'NCL',
        coords: {
          id: 5,
          shape: 'circle',
          coords: [125, 182, 2],
          preFillColor: '#E94560',
        },
      },
      {
        label: 'Liverpool John Lennon Airport',
        code: 'LPL',
        coords: {
          id: 6,
          shape: 'circle',
          coords: [97, 267, 2],
          preFillColor: '#E94560',
        },
      },
      { label: 'Leeds Bradford Airport', code: 'LBA' },
    ],
  },
  {
    region: 'Southern England',
    airports: [
      { label: 'Bournemouth International Airport', code: 'BOH' },
      { label: 'Southampton Airport', code: 'SOU' },
    ],
  },
  {
    region: 'West England & Wales',
    airports: [
      {
        label: 'Bristol Airport',
        code: 'BRS',
        coords: {
          id: 7,
          shape: 'circle',
          coords: [100, 361, 2],
          preFillColor: '#E94560',
        },
      },
      { label: 'Exeter Airport', code: 'EXT' },
      { label: 'Cardiff Airport', code: 'CWL' },
    ],
  },
  {
    region: 'Scotland',
    airports: [
      { label: 'Aberdeen Airport', code: 'ABZ' },
      {
        label: 'Edinburgh Airport',
        code: 'EDI',
        coords: {
          id: 8,
          shape: 'circle',
          coords: [93, 129, 2],
          preFillColor: '#E94560',
        },
      },
      {
        label: 'Glasgow Airport',
        code: 'GLA',
        coords: {
          id: 9,
          shape: 'circle',
          coords: [56, 164, 2],
          preFillColor: '#E94560',
        },
      },
      { label: 'Prestwick Airport', code: 'PIK' },
    ],
  },
];

export default airports;
