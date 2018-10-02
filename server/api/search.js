const express = require('express');
const router = express.Router();
const getNeighborhood = require('./functions/getNeighborhood');
const getLocation = require('./functions/getLocation');
const getYelpData = require('./functions/getYelpData');
const scrapeFilter = require('./functions/scraping');

router.post('/', async (req, res, next) => {
  const scraped = await scrapeFilter(req.body.url);
  console.log(scraped);

  let withSearch = scraped.map(el => {
    return {
      ...el,
      list: req.body.name,
      search: `${el.title} ${el.address} new york city usa`,
    };
  });

  const withLocation = await getLocation(withSearch);

  // const withNeighborhood = await getNeighborhood(withLocation);

  // console.log(withNeighborhood);

  // const withYelpData = getYelpData(withNeighborhood);

  // console.log(withYelpData);

  res.json(withLocation);
});

module.exports = router;
