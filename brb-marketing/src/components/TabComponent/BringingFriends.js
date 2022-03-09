import joinTrip from '../../images/joinTrip.png'
import paySingle from '../../images/paySingle.png'

const BringingFriends = [
  {
    tabTitle: 'Join with a subscription',
    title: 'Start a subscription to join a trip',
    text:
      "With an active BRB subscription you join a friends trip using their TripCode. If they've selected a date before your next eligible trip date, you can make a catchup payment to stay in sync with them.",
    image: {
      url: joinTrip,
      alt: 'Use your subscription to pay',
    },
  },
  {
    tabTitle: 'Join a single trip',
    title: 'Pay for a single trip',
    text:
      "Your friends can join your trip by paying once off. Meaning you don't have to convince them to come on all three trips, and nor do you have to take them on all three if you don't want to",
    image: {
      url: paySingle,
      alt: 'Pay a one off fee',
    },
  },
]

export default BringingFriends
