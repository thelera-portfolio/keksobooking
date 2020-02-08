'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var X_OFFSET = PIN_WIDTH / 2;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (listing) {
    var mapPin = pinTemplate.cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');

    mapPin.style = 'left: ' + (listing.offer.location.x - X_OFFSET) + 'px; top: ' + (listing.offer.location.y - PIN_HEIGHT) + 'px';
    mapPin.dataset.id = listing.id;
    mapPinImage.src = listing.author.avatar;
    mapPinImage.alt = listing.offer.title;

    return mapPin;
  };

  window.pin = {
    createList: function (listings) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < listings.length; i++) {
        fragment.appendChild(createPin(listings[i]));
      }
      return fragment;
    }
  };
})();
