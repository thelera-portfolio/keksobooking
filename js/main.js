'use strict';

var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var AMOUNT_OF_LISTINGS = 8;
var X_OFFSET = PIN_WIDTH / 2;
var Y_OFFSET = PIN_HEIGHT / 2;

var map = document.querySelector('.map');
var mapPinsList = map.querySelector('.map__pins');
var mapWidth = map.clientWidth;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// [minNumber, maxNumber]
var generateNumber = function (minNumber, maxNumber) {
  return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
};

var generateUniqueNumbers = function (minNumber, maxNumber, amountOfNumbers) {
  var uniqueNumbers = [];
  while (uniqueNumbers.length < amountOfNumbers) {
    var number = generateNumber(minNumber, maxNumber);
    if (uniqueNumbers.indexOf(number) === -1) {
      uniqueNumbers.push(number);
    }
  }

  return uniqueNumbers;
};

var generateArrayFromArray = function (array, length) {
  var newArray = [];

  for (var i = 0; i < length; i += 1) {
    newArray.push(array[generateNumber(1, length - 1)]);
  }

  return newArray;
};

var createListing = function (amountOfListings) {
  var listings = [];
  var avatarUniqueNumbers = generateUniqueNumbers(1, 8, amountOfListings);

  for (var i = 0; i < amountOfListings; i += 1) {
    listings.push({
      author: {
        avatar: 'img/avatars/user0' + avatarUniqueNumbers[i] + '.png',
      },
      offer: {
        title: 'Объявление №' + generateNumber(1, 8),
        address: 'location.' + generateNumber(100, 999) + ' location.' + generateNumber(100, 999),
        price: generateNumber(100, 100000),
        type: ACCOMODATION_TYPE[generateNumber(0, ACCOMODATION_TYPE.length - 1)],
        rooms: generateNumber(1, 10),
        guests: generateNumber(1, 20),
        checkin: CHECKIN_TIME[generateNumber(0, CHECKIN_TIME.length - 1)],
        checkout: CHECKOUT_TIME[generateNumber(0, CHECKOUT_TIME.length - 1)],
        features: generateArrayFromArray(FEATURES, generateNumber(1, FEATURES.length - 1)),
        description: 'Описание вашего жилья',
        photos: generateArrayFromArray(PHOTOS, generateNumber(1, PHOTOS.length - 1)),
        location: {
          x: generateNumber(X_OFFSET, mapWidth - X_OFFSET),
          y: generateNumber(130, 630)
        }
      }
    });
  }

  return listings;
};

var similarListings = createListing(AMOUNT_OF_LISTINGS);

map.classList.remove('map--faded');

var createPin = function (listing) {
  var mapPin = pinTemplate.cloneNode(true);
  var mapPinImage = mapPin.querySelector('img');

  mapPin.style = 'left: ' + (listing.offer.location.x - X_OFFSET) + 'px; top: ' + (listing.offer.location.y - Y_OFFSET) + 'px';
  mapPinImage.src = listing.author.avatar;
  mapPinImage.alt = listing.offer.title;

  return mapPin;
};

var createPinList = function (listings) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < listings.length; i += 1) {
    fragment.appendChild(createPin(listings[i]));
  }

  return fragment;
};

mapPinsList.appendChild(createPinList(similarListings));
