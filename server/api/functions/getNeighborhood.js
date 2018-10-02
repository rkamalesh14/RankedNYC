const geocoding = new require('reverse-geocoding-google');

const getNeighborhood = async arr => {
  const promises = arr.map(place => {
    const config = {
      latitude: place.location.lat,
      longitude: place.location.lng,
      key: 'AIzaSyBzIx1pJZBmjspYxcQp3g24Tfb4gPhlQWw',
    };

    return new Promise(function(resolve, reject) {
      geocoding.location(config, function(err, data) {
        if (err) {
          console.log(err);
          reject(new Error('error'));
        } else {
          return data.results.forEach(el => {
            if (el.types[0] === 'neighborhood' && !place.neighborhood) {
              place.neighborhood = el.address_components[0].long_name;
              resolve(place);
              return true;
            }
          });
        }
      });
    });
  });

  console.log(promises);
  const withNhood = await Promise.all(promises);

  // check neighborhoods and make changes if necessary (e.g., Ukranian V to EV)
  return withNhood;
};

module.exports = getNeighborhood;
