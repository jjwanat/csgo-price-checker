var request = require("request"),
    cheerio = require("cheerio"),
    urlDopplerBayo = "https://steamcommunity.com/market/search?category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Weapon%5B%5D=tag_weapon_bayonet&appid=730&q=doppler";

var api_key = 'key-63a5ebafb80f1d576c0c0a6d01007ea1';
var mg_domain = 'sandboxe4257b7ad2204297a4a8e920ec45a455.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: mg_domain});

var knifeList = [];

request(urlDopplerBayo, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);

    $('.market_listing_item_name').each(function(i, elem) {
      price  = $(this).parents('div.market_listing_searchresult').find('span.sale_price').text();
      name = $(this).text().trim();
      knifeList.push(name + ': ' + price);
    });
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});

var data = {
  from: 'Doug Likes Nipples <me@samples.mailgun.org>',
  to: 'wanat.joe@gmail.com',
  subject: 'Hello, fat boy!',
  text: 'Testing some Mailgun awesomness!'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
