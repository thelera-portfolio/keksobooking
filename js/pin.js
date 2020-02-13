'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var X_OFFSET = PIN_WIDTH / 2;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (offer) {
    var mapPin = pinTemplate.cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');

    mapPin.style = 'left: ' + (offer.location.x - X_OFFSET) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px';
    mapPin.dataset.id = offer.id;
    mapPinImage.src = offer.author.avatar;
    mapPinImage.alt = offer.offer.title;

    return mapPin;
  };

  window.pin = {
    createList: function (offerData) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < offerData.length; i++) {
        fragment.appendChild(createPin(offerData[i]));
      }
      return fragment;
    }
  };
})();
