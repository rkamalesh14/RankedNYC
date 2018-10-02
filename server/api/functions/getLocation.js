const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBzIx1pJZBmjspYxcQp3g24Tfb4gPhlQWw',
  Promise: Promise,
});

const getLocation = async arr => {
  const result = arr.map(async el => {
    return await googleMapsClient.geocode({ address: el.search }).asPromise();
  });

  const getLat = await Promise.all(result);

  const objWithLat = getLat.map((el, i) => {
    const results = el.json.results[0];
    return {
      ...arr[i],
      address: results.formatted_address,
      location: results.geometry.location,
      url: `https://www.google.com/maps/search/?api=1&query=${
        results.geometry.location.lat
      },${results.geometry.location.lng}&query_place_id=${results.place_id}`,
    };
  });
  return objWithLat;
};

module.exports = getLocation;
