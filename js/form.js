'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var MAIN_PIN_TAIL_HEIGHT = 22;
  var X_OFFSET_MAIN_PIN = MAIN_PIN_WIDTH / 2;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var ACCOMODATION_SETTINGS = {
    palace: {
      label: 'дворец',
      price: 10000
    },
    flat: {
      label: 'квартира',
      price: 1000
    },
    house: {
      label: 'дом',
      price: 5000
    },
    bungalo: {
      label: 'бунгало',
      price: 0
    }
  };

  var adForm = document.querySelector('.ad-form');
  var adFormElementFieldsets = adForm.querySelectorAll('.ad-form__element');
  var adFormHeaderFieldset = adForm.querySelector('.ad-form-header');
  var adFormAddressFiels = adForm.querySelector('input[name="address"]');
  var map = document.querySelector('.map');
  var mapMainPin = map.querySelector('.map__pin--main');
  var mapWidth = map.clientWidth;

  // отключение полей формы
  for (var i = 0; i < adFormElementFieldsets.length; i++) {
    adFormElementFieldsets[i].setAttribute('disabled', 'disabled');
  }
  adFormHeaderFieldset.setAttribute('disabled', 'disabled');

  // валидация формы
  // заполнение поля адреса
  window.form = {
    setPinAddress: function () {
      var locationX = mapMainPin.offsetLeft + MAIN_PIN_WIDTH / 2;
      var locationY = mapMainPin.offsetTop + MAIN_PIN_HEIGHT;
      var startLocationY = mapMainPin.offsetTop + (MAIN_PIN_HEIGHT - MAIN_PIN_TAIL_HEIGHT) / 2;

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

      if (map.classList.contains('map--faded')) {
        adFormAddressFiels.value = locationX + ', ' + startLocationY;
      } else {
        adFormAddressFiels.value = locationX + ', ' + locationY;
      }
    }
  };

  // установка соответствия количества гостей (спальных мест) с количеством комнат
  var roomsAmountErrorMessages = {
    1: '1 комната — «для 1 гостя»',
    2: '2 комнаты — «для 2 гостей» или «для 1 гостя»',
    3: '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
    100: '100 комнат — «не для гостей»'
  };
  var amountOfGuestsInput = adForm.querySelector('select[name="capacity"]');
  var amountOfRoomsInput = adForm.querySelector('select[name="rooms"]');

  var checkRoomsValidity = function () {
    if (amountOfGuestsInput.value === amountOfRoomsInput.value) {
      amountOfGuestsInput.setCustomValidity('');
    } else {
      amountOfGuestsInput.setCustomValidity(roomsAmountErrorMessages[amountOfRoomsInput.value]);
    }
  };

  checkRoomsValidity();

  amountOfGuestsInput.addEventListener('change', function () {
    checkRoomsValidity();
  });

  // поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
  var priceField = adForm.querySelector('input[name="price"]');
  var accomodationTypeField = adForm.querySelector('select[name="type"]');

  accomodationTypeField.addEventListener('change', function () {
    priceField.placeholder = ACCOMODATION_SETTINGS[accomodationTypeField.value].price;
  });

  // синхронизация полей «Время заезда» и «Время выезда»
  var checkinTime = adForm.querySelector('select[name="timein"]');
  var checkoutTime = adForm.querySelector('select[name="timeout"]');

  checkinTime.addEventListener('change', function () {
    checkoutTime.value = checkinTime.value;
  });
})();
