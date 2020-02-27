'use strict';

(function () {
  var MainPin = {
    MAIN_PIN_WIDTH: 62,
    MAIN_PIN_HEIGHT: 84,
    MAIN_PIN_TAIL_HEIGHT: 22
  };

  var X_OFFSET_MAIN_PIN = MainPin.MAIN_PIN_WIDTH / 2;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormAddressField = adForm.querySelector('input[name="address"]');
  var mapMainPin = map.querySelector('.map__pin--main');
  var mapWidth = map.clientWidth;

  // вычисление адреса по острому концу главной метки и заполнение поля адреса в форме
  window.address = {
    set: function () {
      var locationX = mapMainPin.offsetLeft + X_OFFSET_MAIN_PIN;
      var locationY = mapMainPin.offsetTop + MainPin.MAIN_PIN_HEIGHT;
      var startLocationY = mapMainPin.offsetTop + (MainPin.MAIN_PIN_HEIGHT - MainPin.MAIN_PIN_TAIL_HEIGHT) / 2;

      if (locationY < Y_MIN) {
        locationY = Y_MIN;
      } else if (locationY > Y_MAX) {
        locationY = Y_MAX;
      }

      if (locationX < X_OFFSET_MAIN_PIN) {
        locationX = X_OFFSET_MAIN_PIN;
      } else if (locationX > mapWidth - X_OFFSET_MAIN_PIN) {
        locationX = mapWidth - X_OFFSET_MAIN_PIN;
      }

      adFormAddressField.value = map.classList.contains('map--faded') ? locationX + ', ' + startLocationY : locationX + ', ' + locationY;
    },
    getStartLocation: function () {
      var location = {};
      location.x = mapMainPin.offsetLeft + X_OFFSET_MAIN_PIN;
      location.y = mapMainPin.offsetTop + (MainPin.MAIN_PIN_HEIGHT - MainPin.MAIN_PIN_TAIL_HEIGHT) / 2;
      location.left = mapMainPin.style.left;
      location.top = mapMainPin.style.top;
      return location;
    },
    setStartLocation: function (location) {
      mapMainPin.style.left = location.left;
      mapMainPin.style.top = location.top;
      adFormAddressField.value = location.x + ', ' + location.y;
    }
  };
})();
