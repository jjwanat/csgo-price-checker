var request = require("request"),
cheerio = require("cheerio"),
urlFactoryNew = "https://steamcommunity.com/market/listings/730/%E2%98%85%20Bayonet%20%7C%20Doppler%20%28Factory%20New%29",
urlMinWear = "https://steamcommunity.com/market/listings/730/%E2%98%85%20Bayonet%20%7C%20Doppler%20%28Minimal%20Wear%29",
urlDopplerBayo = "https://steamcommunity.com/market/search?category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Weapon%5B%5D=tag_weapon_bayonet&appid=730&q=doppler";

request(urlFactoryNew, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);
    var prices  = [];

    $('.market_listing_price_with_fee').each(function(i, elem) {
        prices[i] = $(this).text().trim();
    });

    prices.join(', ');

    console.log('Factory New Prices: ' + prices);

  } else {
    console.log("We’ve encountered an error: " + error);
  }
});


request(urlDopplerBayo, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);

    $('.market_listing_item_name').each(function(i, elem) {
        price  = $(this).parents('div.market_listing_searchresult').find('span.sale_price').text();
        name = $(this).text().trim();
        console.log(name + ': ' + price);
    });
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
