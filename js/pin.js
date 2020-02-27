'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var X_OFFSET = PIN_WIDTH / 2;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsList = document.querySelector('.map__pins');

  var createPin = function (data) {
    var mapPin = pinTemplate.cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');

    if (!data.offer) {
      return undefined;
    }

    mapPin.style = 'left: ' + (data.location.x - X_OFFSET) + 'px; top: ' + (data.location.y - PIN_HEIGHT) + 'px';
    mapPin.dataset.id = data.id;
    mapPinImage.src = data.author.avatar;
    mapPinImage.alt = data.offer.title;

    return mapPin;
  };

  var createList = function (offerData) {
    var fragment = document.createDocumentFragment();

    offerData.forEach(function (offer) {
      if (createPin(offer)) {
        fragment.appendChild(createPin(offer));
      }
    });

    return fragment;
  };

  window.pin = {
    draw: function (data) {
      if (mapPinsList.children.length > 1) {
        mapPinsList.appendChild(createList(data));
      }
    },
    remove: function () {
      var mapPinListChildren = Array.from(mapPinsList.children);
      mapPinListChildren.forEach(function (pin) {
        if (!pin.classList.contains('map__pin--main') && !pin.classList.contains('map__overlay')) {
          mapPinsList.removeChild(pin);
        }
      });
    }
  };
})();
