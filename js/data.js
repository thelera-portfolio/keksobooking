'use strict';

(function () {
  var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PIN_WIDTH = 50;
  var X_OFFSET = PIN_WIDTH / 2;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var map = document.querySelector('.map');
  var mapWidth = map.clientWidth;

  // [minNumber, maxNumber]
  var generateNumber = function (minNumber, maxNumber) {
    return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
  };

  var generateUniqueArray = function (array, length) {
    var newArray = [];

    for (var i = 0; i < length; i++) {
      newArray.push(array[i]);
    }

    return newArray;
  };

  // моки для карточки объявления
  window.data = {
    createListing: function (amountOfListings) {
      var listings = [];

      for (var i = 0; i < amountOfListings; i++) {
        var locationX = generateNumber(X_OFFSET, mapWidth - X_OFFSET);
        var locationY = generateNumber(Y_MIN, Y_MAX);

        listings.push({
          id: i,
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png',
          },
          offer: {
            title: 'Объявление №' + (i + 1),
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
    }
  };
})();
