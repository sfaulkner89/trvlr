export default {
  username: 'Sam',
  name: 'samDogChamillionaire',
  profilePicture: require('./profilePics/sam.jpeg'),
  countries: 68,
  worldCovered: 57.5,
  friends: 342,
  lists: [
    {
      name: 'Boston Weekend Party List',
      city: 'Boston',
      country: 'USA',
      location: {
        lat: 42.3601,
        lng: -71.0589
      },
      dateCreated: new Date('00-06-2018'),
      dateModified: new Date('03-05-2020'),
      places: [
        {
          name: 'Saltie Girl',
          placeType: 'restaurant',
          location: {
            lat: 42.351229,
            lng: -71.077677
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
            lat: 42.3551,
            lng: -71.0657
          },
          dateCreated: new Date('00-06-2018'),
          dateModified: new Date('00-06-2018'),
          notes: 'Gorgeous, make sure you frolic at full speed.'
        }
      ]
    }
  ]
}
