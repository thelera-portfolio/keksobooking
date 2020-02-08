'use strict';

(function () {
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

  // отключение полей формы
  for (var i = 0; i < adFormElementFieldsets.length; i++) {
    adFormElementFieldsets[i].setAttribute('disabled', 'disabled');
  }
  adFormHeaderFieldset.setAttribute('disabled', 'disabled');
  // валидация формы
  // установка соответствия количества гостей (спальных мест) с количеством комнат
  var roomsAmountErrorMessages = {
    1: '1 комната — «для 1 гостя»',
    2: '2 комнаты — «для 2 гостей» или «для 1 гостя»',
    3: '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
    100: '100 комнат — «не для гостей»'
  };

  var amountOfGuestsInput = adForm.querySelector('select[name = "capacity"]');
  var amountOfRoomsInput = adForm.querySelector('select[name = "rooms"]');
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
  var priceField = adForm.querySelector('input[name = "price"]');
  var accomodationTypeField = adForm.querySelector('select[name = "type"]');
  accomodationTypeField.addEventListener('change', function () {
    priceField.placeholder = ACCOMODATION_SETTINGS[accomodationTypeField.value].price;
  });

  // синхронизация полей «Время заезда» и «Время выезда»
  var checkinTime = adForm.querySelector('select[name = "timein"]');
  var checkoutTime = adForm.querySelector('select[name = "timeout"]');
  checkinTime.addEventListener('change', function () {
    checkoutTime.value = checkinTime.value;
  });

  window.form = {
    enable: function () {
      adForm.classList.remove('ad-form--disabled');
      for (var j = 0; j < adFormElementFieldsets.length; j++) {
        adFormElementFieldsets[j].removeAttribute('disabled', 'disabled');
      }
      adFormHeaderFieldset.removeAttribute('disabled', 'disabled');
    },
    disable: function () {
      adForm.classList.add('ad-form--disabled');
      for (var k = 0; k < adFormElementFieldsets.length; k++) {
        adFormElementFieldsets[k].setAttribute('disabled', 'disabled');
      } adFormHeaderFieldset.setAttribute('disabled', 'disabled');
    }
  };
})();
