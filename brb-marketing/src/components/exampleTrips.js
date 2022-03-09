import moment from 'moment'
import berlin1 from '../images/examples/berlin1.png'
import berlin2 from '../images/examples/berlin2.jpg'
import berlin3 from '../images/examples/berlin3.jpg'
import rome1 from '../images/examples/rome1.png'
import rome2 from '../images/examples/rome2.jpg'
import rome3 from '../images/examples/rome3.jpg'

const exampleTrips = [
  {
    city: 'Rome',
    hotel: 'Villa Glori',
    emoji: '🇮🇹',
    stars: '★★★★',
    gstars: '★',
    startDate: moment(),
    photos: [rome1, rome2, rome3],
    type: 'Culture',
  },
  {
    city: 'Berlin',
    hotel: 'Gat Point Charlie',
    stars: '★★★★',
    gstars: '★',
    startDate: moment().add(3, 'months'),
    photos: [berlin1, berlin2, berlin3],
    type: 'Party',
  },
]

export default exampleTrips
