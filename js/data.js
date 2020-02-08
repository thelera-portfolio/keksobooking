'use strict';

(function () {
  var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var X_OFFSET = PIN_WIDTH / 2;
  var Y_MIN = 130 + PIN_HEIGHT;
  var Y_MAX = 630;

  var map = document.querySelector('.map');
  var mapWidth = map.clientWidth;

  // моки для карточки объявления
  window.data = {
    createListing: function (amountOfListings) {
      var listings = [];

      for (var i = 0; i < amountOfListings; i++) {
        var locationX = window.utils.generateNumber(X_OFFSET, mapWidth - X_OFFSET);
        var locationY = window.utils.generateNumber(Y_MIN, Y_MAX);

        listings.push({
          id: i,
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png',
          },
          offer: {
            title: 'Объявление №' + (i + 1),
            address: locationX + ', ' + locationY,
            price: window.utils.generateNumber(100, 100000),
            type: ACCOMODATION_TYPE[window.utils.generateNumber(0, ACCOMODATION_TYPE.length - 1)],
            rooms: window.utils.generateNumber(1, 10),
            guests: window.utils.generateNumber(1, 20),
            checkin: CHECKIN_TIME[window.utils.generateNumber(0, CHECKIN_TIME.length - 1)],
            checkout: CHECKOUT_TIME[window.utils.generateNumber(0, CHECKOUT_TIME.length - 1)],
            features: window.utils.generateUniqueArray(FEATURES, window.utils.generateNumber(1, FEATURES.length)),
            description: 'Описание вашего жилья',
            photos: window.utils.generateUniqueArray(PHOTOS, window.utils.generateNumber(1, PHOTOS.length)),
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
