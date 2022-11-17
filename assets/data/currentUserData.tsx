export default {
  id: 'efad0b7b-47ae-45ae-9fa1-2748888efb6b',
  username: 'Sam',
  name: 'samDogChamillionaire',
  profilePicture: require('../profilePics/sam.jpeg'),
  countries: 68,
  worldCovered: 57.5,
  friends: 342,
  lists: [
    {
      name: 'Boston Weekend Party List',
      city: 'Boston',
      country: 'USA',
      location: {
        latitude: 42.3601,
        longitude: -71.0589
      },
      dateCreated: new Date('00-06-2018'),
      dateModified: new Date('03-05-2020'),
      places: [
        {
          name: 'Saltie Girl',
          placeType: 'restaurant',
          location: {
            latitude: 42.351229,
            longitude: -71.077677
          },
          dateCreated: new Date('00-06-2018'),
          dateModified: new Date('03-05-2020'),
          notes:
            'Man this place had some stank ass seafood...in the best possible way.'
        },
        {
          name: 'Boston Common',
          placeType: 'landmark',
          location: {
            latitude: 42.3551,
            longitude: -71.0657
          },
          dateCreated: new Date('00-06-2018'),
          dateModified: new Date('00-06-2018'),
          notes: 'Gorgeous, make sure you frolic at full speed.'
        }
      ]
    }
  ]
}
