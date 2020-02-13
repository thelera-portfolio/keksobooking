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
  var ESC_KEY = 'Escape';
  var ERROR_MESSAGE = 'Ошибка загрузки объявления. ';

  var adForm = document.querySelector('.ad-form');
  var adFormElementFieldsets = adForm.querySelectorAll('.ad-form__element');
  var adFormHeaderFieldset = adForm.querySelector('.ad-form-header');
  var main = document.querySelector('main');

  var successAnswerTemplate = document.querySelector('#success').content.querySelector('.success');
  var successAnswerPopup = successAnswerTemplate.cloneNode(true);

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorPopup = errorTemplate.cloneNode(true);
  var errorMessage = errorPopup.querySelector('.error__message');
  var errorPopupCloseButton = errorTemplate.querySelector('.error__button');

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
        adForm.reset();
        adFormElementFieldsets[k].setAttribute('disabled', 'disabled');
      } adFormHeaderFieldset.setAttribute('disabled', 'disabled');
    }
  };

  var successAnswerPopupClickHandler = function () {
    successAnswerPopup.parentNode.removeChild(successAnswerPopup);
    document.removeEventListener('click', successAnswerPopupClickHandler);
  };

  var successAnswerPopupEscButtonHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      successAnswerPopup.parentNode.removeChild(successAnswerPopup);
      document.removeEventListener('keydown', successAnswerPopupEscButtonHandler);
    }
  };

  var errorPopupClickHandler = function () {
    errorPopup.parentNode.removeChild(errorPopup);
    document.removeEventListener('click', errorPopupClickHandler);
  };

  var errorPopupEscButtonHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      errorPopup.parentNode.removeChild(errorPopup);
      document.removeEventListener('keydown', errorPopupEscButtonHandler);
    }
  };

  var errorPopupCloseButtonHandler = function () {
    errorPopup.parentNode.removeChild(errorPopup);
    document.removeEventListener('click', errorPopupClickHandler);
  };

  var succeessHandler = function () {
    window.form.disable();
    window.map.activation.disable();

    main.appendChild(successAnswerPopup);

    document.addEventListener('click', successAnswerPopupClickHandler);
    document.addEventListener('keydown', successAnswerPopupEscButtonHandler);
  };

  var errorHandler = function (message) {
    errorMessage.textContent = ERROR_MESSAGE + message;
    main.appendChild(errorPopup);

    document.addEventListener('click', errorPopupClickHandler);
    document.addEventListener('keydown', errorPopupEscButtonHandler);
    errorPopupCloseButton.addEventListener('click', errorPopupCloseButtonHandler);
  };

  // отправка данных на сервер с помощью AJAX
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(succeessHandler, errorHandler, new FormData(adForm));
  });
})();
