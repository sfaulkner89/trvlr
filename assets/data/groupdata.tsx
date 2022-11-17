export const contacts = {
  '477950d1-5ec9-4eaf-8a55-d0f89d004751': {
    id: '477950d1-5ec9-4eaf-8a55-d0f89d004751',
    username: 'Fat Freddy',
    name: 'funtimefreddy',
    profilePicture: require('../profilePics/tats.jpeg'),
    countries: 23,
    worldCovered: 57.5,
    friends: 342,
    lists: []
  },
  '7f4276dc-19e5-4662-bb0f-95b6180ded65': {
    id: '7f4276dc-19e5-4662-bb0f-95b6180ded65',
    username: 'Big Freedia',
    name: 'friedafuxxx4000',
    profilePicture: require('../profilePics/big-freedia.jpeg'),
    countries: 23,
    worldCovered: 57.5,
    friends: 342,
    lists: []
  },
  'f62e6428-4442-404c-b746-d013633de84f': {
    id: 'f62e6428-4442-404c-b746-d013633de84f',
    username: 'Tiny Punisher',
    name: 'stinkboxdaddy',
    profilePicture: require('../profilePics/dumb.jpeg'),
    countries: 23,
    worldCovered: 57.5,
    friends: 342,
    lists: []
  }
}

export default [
  {
    groupName: 'Friends',
    members: [contacts['477950d1-5ec9-4eaf-8a55-d0f89d004751']]
  },
  {
    groupName: 'Colleagues',
    members: [
      contacts['7f4276dc-19e5-4662-bb0f-95b6180ded65'],
      contacts['f62e6428-4442-404c-b746-d013633de84f']
    ]
  }
]
