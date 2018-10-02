const yelp = require('yelp-fusion');
const apiKey =
  '8jOwkc6fbapUxic0kFWU7GFZUPROIqY34LYOa5F7aF9sbYXPjKUMpbAAcCUOREhWVZLQfnlp4T72auxjbJKNbBJD10ebD4lialCPgYyH2zaYpye3Jpp-iDOAr7EhW3Yx';
const client = yelp.client(apiKey);

const getYelpData = arr => {
  const promises = arr.map(async el => {
    const searchRequest = {
      term: el.search.slice(0, -18),
      location: 'new york, ny',
    };
    client
      .search(searchRequest)
      .then(response => {
        const firstResult = response.jsonBody.businesses[0];
        const prettyJson = JSON.stringify(firstResult, null, 4);
        console.log(prettyJson);
      })
      .catch(e => {
        console.log(e);
      });
  });
};

module.exports = getYelpData;
