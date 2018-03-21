var express = require("express");
var app = express();
var Deck = require("card-deck");
// Korttipakka
var i;
var myDeck = new Deck([]);
// Käsianalyysi
var poker = require('poker-hands');
// ejs
app.set("view engine", "ejs");

// Erikoiskortit pakkaan
myDeck.addRandom(["TC","JC","QC","KC","AC"]);
myDeck.addRandom(["TS","JS","QS","KS","AS"]);
myDeck.addRandom(["TD","JD","QD","KD","AD"]);
myDeck.addRandom(["TH","JH","QH","KH","AH"]);

// Normaalit kortit pakkaan.
// Pata
for (i = 2; i <= 9; i++) {
  myDeck.addRandom([i+"S"]);
};
// Ruutu
for (i = 2; i <= 9; i++) {
  myDeck.addRandom([i+"D"]);
};
// Hertta
for (i = 2; i <= 9; i++) {
  myDeck.addRandom([i+"H"]);
};
// Risti
for (i = 2; i <= 9; i++) {
  myDeck.addRandom([i+"C"]);
};

// Laske kortit (toivottavasti 52)
console.log("Korttipakassa yhteensä "+myDeck.remaining()+" korttia.");

// Pakan sekoitus
myDeck.shuffle();

// Index
app.get("/", function(req, res) {
  res.render("index");

// Aina kun index päivitetään, ohjelma nostaa pakasta 3 kättä ja tulostaa konsoliin
  console.log("=========== START ==============");
// Nostetaan 3 kättä
  for (i = 1; i <= 3; i++) {
// Nosta käsi ja muokkaa oikeaan muotoon analyysia varten
  var hand = ""+myDeck.drawRandom(5)+"";
  var uusi = " "
  hand = hand.split(",").join(uusi);
  console.log("Nostit uuden käden: "+hand);

    // doesnotwerk
    // console.log("/Debug");
    // console.log(poker.hasTwoPairs(hand));
    // console.log(poker.hasStraight(hand));
    // console.log(poker.hasFlush(hand));
    // console.log(poker.hasFullHouse(hand));
    // console.log(poker.hasStraightFlush(hand));
    // console.log("Debug/");

  // Käden analysointi
  if (poker.hasTwoPairs(hand) == undefined && poker.hasStraight(hand) == false && poker.hasFlush(hand) == undefined && poker.hasFullHouse(hand) == undefined && poker.hasStraightFlush(hand) == undefined) {
    console.log("Ei voittoa.");
  } else if (poker.hasTwoPairs(hand) !== undefined) {
    console.log("Sait kaksi paria: "+poker.hasTwoPairs(hand));
  } else if (poker.hasStraight(hand) !== false) {
    console.log("Sait suoran.");
  }
    else if (poker.hasFlush(hand) !== undefined) {
    console.log("Sait värin.");
  }
    else if (poker.hasFullHouse(hand) !== undefined) {
    console.log("Sait täyskäden.");
  }
    else if (poker.hasStraightFlush(hand) !== undefined) {
    console.log("Sait värisuoran.");
  }
}
console.log("=========== END ================");
});


// Server
app.listen(3000, function (req, res) {

});
