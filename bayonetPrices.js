var request = require("request"),
cheerio = require("cheerio"),
urlFactoryNew = "https://steamcommunity.com/market/listings/730/%E2%98%85%20Bayonet%20%7C%20Doppler%20%28Factory%20New%29",
urlMinWear = "https://steamcommunity.com/market/listings/730/%E2%98%85%20Bayonet%20%7C%20Doppler%20%28Minimal%20Wear%29";

request(urlFactoryNew, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);
    var prices  = [];

    $('.market_listing_price_with_fee').each(function(i, elem) {
        prices[i] = $(this).text().trim();
    });

    prices.join(', ');

    console.log(prices);

  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
