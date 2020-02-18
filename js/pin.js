'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var X_OFFSET = PIN_WIDTH / 2;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsList = document.querySelector('.map__pins');

  var createPin = function (offer) {
    var mapPin = pinTemplate.cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');

    mapPin.style = 'left: ' + (offer.location.x - X_OFFSET) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px';
    mapPin.dataset.id = offer.id;
    mapPinImage.src = offer.author.avatar;
    mapPinImage.alt = offer.offer.title;

    return mapPin;
  };

  var createList = function (offerData) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offerData.length; i++) {
      fragment.appendChild(createPin(offerData[i]));
    }
    return fragment;
  };

  window.pin = {
    draw: function (data) {
      if (mapPinsList.children.length > 1) {
        mapPinsList.appendChild(createList(data));
      }
    },
    remove: function () {
      for (var i = mapPinsList.children.length - 1; i > 0; i--) {
        if (!mapPinsList.children[i].classList.contains('map__pin--main')) {
          mapPinsList.removeChild(mapPinsList.children[i]);
        }
      }
    }
  };
})();
