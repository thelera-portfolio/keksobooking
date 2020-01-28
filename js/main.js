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
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// [minNumber, maxNumber]
var generateNumber = function (minNumber, maxNumber) {
  return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
};

var generateUniqueArray = function (array, length) {
  var newArray = [];

  for (var i = 0; i < length; i += 1) {
    newArray.push(array[i]);
  }

  return newArray;
};

// моки для карточки объявления
var createListing = function (amountOfListings) {
  var listings = [];

  for (var i = 0; i < amountOfListings; i += 1) {
    var locationX = generateNumber(X_OFFSET, mapWidth - X_OFFSET);
    var locationY = generateNumber(130, 630);

    listings.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: 'Объявление №' + generateNumber(1, 8),
        address: locationX + ', ' + locationY,
        price: generateNumber(100, 100000),
        type: ACCOMODATION_TYPE[generateNumber(0, ACCOMODATION_TYPE.length - 1)],
        rooms: generateNumber(1, 10),
        guests: generateNumber(1, 20),
        checkin: CHECKIN_TIME[generateNumber(0, CHECKIN_TIME.length - 1)],
        checkout: CHECKOUT_TIME[generateNumber(0, CHECKOUT_TIME.length - 1)],
        features: generateUniqueArray(FEATURES, generateNumber(1, FEATURES.length)),
        description: 'Описание вашего жилья',
        photos: generateUniqueArray(PHOTOS, generateNumber(1, PHOTOS.length)),
        location: {
          x: locationX,
          y: locationY
        }
      }
    });
  }

  return listings;
};

var similarListings = createListing(AMOUNT_OF_LISTINGS);

map.classList.remove('map--faded');

// пин
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

// карточка объявления
var createInfoCard = function (listing) {
  var card = cardTemplate.cloneNode(true);
  var title = card.querySelector('.popup__title');
  var address = card.querySelector('.popup__text--address');
  var price = card.querySelector('.popup__text--price');
  var type = card.querySelector('.popup__type');
  var capacity = card.querySelector('.popup__text--capacity');
  var visitTime = card.querySelector('.popup__text--time');
  var featuresList = card.querySelector('.popup__features');
  var features = featuresList.querySelectorAll('.popup__feature');
  var description = card.querySelector('.popup__description');
  var photosList = card.querySelector('.popup__photos');
  var photo = photosList.querySelector('.popup__photo');
  var avatar = card.querySelectorAll('.popup__avatar');

  if (!listing.offer.title) {
    title.remove();
  }
  title.textContent = listing.offer.title;

  if (listing.offer.address) {
    address.remove();
  }
  address.textContent = listing.offer.address;

  if (!listing.offer.price) {
    price.remove();
  }
  price.textContent = listing.offer.price + '₽/ночь';

  if (!listing.offer.rooms || !listing.offer.guests) {
    capacity.remove();
  }
  capacity.textContent = listing.offer.rooms + ' комнаты для ' + listing.offer.guests + ' гостей';

  if (!listing.offer.checkin || !listing.offer.checkout) {
    visitTime.remove();
  }
  visitTime.textContent = 'Заезд после ' + listing.offer.checkin + ', выезд до ' + listing.offer.checkout;

  if (!listing.offer.description) {
    description.remove();
  }
  description.textContent = listing.offer.description;

  if (!listing.author.avatar) {
    avatar.remove();
  }
  avatar.src = listing.author.avatar;

  if (!listing.offer.type) {
    type.remove();
  }
  switch (listing.offer.type) {
    case 'palace':
      type.textContent = 'дворец';
      break;

    case 'flat':
      type.textContent = 'квартира';
      break;

    case 'house':
      type.textContent = 'дом';
      break;

    case 'bungalo':
      type.textContent = 'бунгало';
      break;
  }

  if (!listing.offer.features || listing.offer.features.length === 0) {
    featuresList.remove();
  }
  // удаляем из склонированного шаблона удобства, которых нет в данной карточке
  for (var i = 0; i < FEATURES.length; i += 1) {
    var count = 0;
    for (var j = 0; j < listing.offer.features.length; j += 1) {
      if (FEATURES[i] === listing.offer.features[j]) {
        count += 1;
      }
    }
    if (count === 0) {
      featuresList.removeChild(features[i]);
    }
  }

  if (!listing.offer.photos || listing.offer.photos.length === 0) {
    photosList.remove();
  }

  photo.src = listing.offer.photos[0];
  for (var k = 1; j < listing.offer.photos.length; k += 1) {
    var newPhoto = photo.cloneNode();
    photosList.appendChild(newPhoto);
    newPhoto.src = listing.offer.photos[k];
  }

  return card;
};

/* var createInfoCardList = function (listings) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < listings.length; i += 1) {
    fragment.appendChild(createInfoCard(listings[i]));
  }

  return fragment;
};*/
console.log(similarListings[3]);
console.log(createInfoCard(similarListings[3]));

map.insertBefore(createInfoCard(similarListings[5]), map.querySelector('.map__filters-container'));
