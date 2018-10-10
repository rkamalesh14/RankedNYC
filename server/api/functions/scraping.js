const puppeteer = require('puppeteer');
const inquirer = require('inquirer');

let scrapeInfatuation = async url => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitFor(1000);

  const result = await page.evaluate(() => {
    let data = [];
    let elements = document.querySelectorAll('.spot-block');

    for (var element of elements) {
      let title = element.querySelector('h3').innerText;
      if (title.slice(-1) === '\n') {
        title = title.slice(0, -1);
      }
      let neighborhood = element.querySelector('span').innerText.slice(0, -1);
      let address = element.querySelector('small').innerText.slice(1);
      let description = element.querySelector(
        'div.spot-block__description p:nth-child(2)'
      ).innerText;

      data.push({ title, neighborhood, address, description });
    }
    return data;
  });
  browser.close();
  return result;
};

let scrapeTimeout = async url => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitFor(1000);

  const result = await page.evaluate(() => {
    let data = [];
    let elements = document.querySelectorAll('article.feature-item');
    let el = document.querySelector(
      'div.feature_ite__annotation--truncated h3'
    );
    // for (var element of elements) {
    //   let title = element.querySelector(
    //     'div.feature_ite__annotation--truncated h3'
    //   ).innerText;
    //   console.log('1');
    //   // if (title.slice(-1) === '\n') {
    //   //   title = title.slice(0, -1);
    //   // }
    //   let neighborhood = element
    //     .querySelector('div.listing_meta_controls spain')
    //     .innerText.slice(0, -1);
    //   console.log('2');

    //   // let address = element.querySelector('small').innerText.slice(1);
    //   let description = element.querySelector(
    //     'div.feature_ite__annotation--truncated p:nth-child(2)'
    //   ).innerText;
    //   console.log('3');

    //   data.push({ title, neighborhood, description });
    // }
    console.log(elements);
    return el;
  });
  browser.close();
  return result;
};

const scrapeFilter = url => {
  const arr = url.split('.');
  if (arr[1] === 'theinfatuation') {
    const result = scrapeInfatuation(url);
    return result;
  } else if (arr[1] === 'timeout') {
    const result = scrapeTimeout(url);
    return result;
  }
};

module.exports = scrapeFilter;
