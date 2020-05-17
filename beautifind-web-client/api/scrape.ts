import { NowRequest, NowResponse } from '@now/node';
import cheerio from "cheerio";
import moment from "moment";
import axios from "axios";

/**
 * Scraping
 *
 * Each business will have a range of Services.
 * A Service has:
 *  - Name
 *  - Price
 *  - Selector string. This is the CSS selector used by the scraper to retrieve this service price?
 *
 * When scraping, we need to detect the following:
 *  - Price change
 *  - Service name change - Is this therefore a different service? We would need manual intervention.
 *
 *  What can we determine automatically?
 *  - If only a price changes, and service name stays the same, just update the price.
 */

function extractListingsFromHTML (html) {
  const $ = cheerio.load(html);
  const rows = $('#content > div.hColumn > div > div.hColumnIn > div:nth-child(1) > article p');

  const services = ["test"];
  rows.each((i, el) => {

    // Extract information from each row of the jobs table
    let service = $(el).children('span').first().text().trim();
    services.push(service);
  });

  return services;
}

export default function(req: NowRequest, res: NowResponse) {
  axios('http://www.riobeauty.nz/index.html')
    .then(({data}) => {
      const services = extractListingsFromHTML(data);
      res.json({
        body: services,
        query: req.query,
        cookies: req.cookies
      });
    })
    .catch((e) => {
      res.json({
        body: e,
        query: req.query,
        cookies: req.cookies
      });
    });

}