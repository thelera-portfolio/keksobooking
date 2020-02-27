'use strict';

(function () {
  var ERROR_MESSAGE = 'Ошибка загрузки объявления. ';

  var accomadationSettingsMap = {
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
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  var mainContent = document.querySelector('main');

  var successAnswerTemplate = document.querySelector('#success').content.querySelector('.success');
  var successAnswerPopup = successAnswerTemplate.cloneNode(true);

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorPopup = errorTemplate.cloneNode(true);
  var errorMessage = errorPopup.querySelector('.error__message');
  var errorPopupCloseButton = errorTemplate.querySelector('.error__button');

  window.form = {
    enable: function () {
      adForm.classList.remove('ad-form--disabled');

      Array.from(adFormElementFieldsets).forEach(function (fieldset) {
        fieldset.removeAttribute('disabled', 'disabled');
      });

      adFormHeaderFieldset.removeAttribute('disabled', 'disabled');
    },
    disable: function () {
      adForm.classList.add('ad-form--disabled');

      Array.from(adFormElementFieldsets).forEach(function (fieldset) {
        adForm.reset();
        fieldset.setAttribute('disabled', 'disabled');
      });

      adFormHeaderFieldset.setAttribute('disabled', 'disabled');
    }
  };

  // отключение полей формы
  window.form.disable();

  // валидация формы
  // установка соответствия количества гостей (спальных мест) с количеством комнат
  var roomsAmountErrorMessagesMap = {
    1: '1 комната — «для 1 гостя»',
    2: '2 комнаты — «для 2 гостей» или «для 1 гостя»',
    3: '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
    100: '100 комнат — «не для гостей»'
  };

  var amountOfGuestsInput = adForm.querySelector('select[name = "capacity"]');
  var amountOfRoomsInput = adForm.querySelector('select[name = "rooms"]');
  var checkRoomsValidity = function () {
    if ((amountOfRoomsInput.value >= amountOfGuestsInput.value && amountOfGuestsInput.value !== '0' && amountOfRoomsInput.value !== '100') || (amountOfGuestsInput.value === '0' && amountOfRoomsInput.value === '100')) {
      amountOfGuestsInput.setCustomValidity('');
    } else {
      amountOfGuestsInput.setCustomValidity(roomsAmountErrorMessagesMap[amountOfRoomsInput.value]);
    }
  };

  checkRoomsValidity();

  amountOfGuestsInput.addEventListener('change', function () {
    checkRoomsValidity();
  });

  amountOfRoomsInput.addEventListener('change', function () {
    checkRoomsValidity();
  });

  // поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
  var priceField = adForm.querySelector('input[name = "price"]');
  var accomodationTypeField = adForm.querySelector('select[name = "type"]');

  accomodationTypeField.addEventListener('change', function () {
    priceField.placeholder = accomadationSettingsMap[accomodationTypeField.value].price;
    if (priceField.value < accomadationSettingsMap[accomodationTypeField.value].price) {
      priceField.setCustomValidity(accomadationSettingsMap[accomodationTypeField.value].label + ' - минимальная цена за ночь ' + accomadationSettingsMap[accomodationTypeField.value].price);
    } else {
      priceField.setCustomValidity('');
    }
  });

  priceField.addEventListener('input', function (evt) {
    var target = evt.target;
    if (priceField.value < accomadationSettingsMap[accomodationTypeField.value].price) {
      target.setCustomValidity(accomadationSettingsMap[accomodationTypeField.value].label + ' - минимальная цена за ночь ' + accomadationSettingsMap[accomodationTypeField.value].price);
    } else {
      target.setCustomValidity('');
    }
  });

  // синхронизация полей «Время заезда» и «Время выезда»
  var checkinTime = adForm.querySelector('select[name = "timein"]');
  var checkoutTime = adForm.querySelector('select[name = "timeout"]');
  checkinTime.addEventListener('change', function () {
    checkoutTime.value = checkinTime.value;
  });
  checkoutTime.addEventListener('change', function () {
    checkinTime.value = checkoutTime.value;
  });

  var successAnswerPopupClickHandler = function () {
    successAnswerPopup.parentNode.removeChild(successAnswerPopup);
    document.removeEventListener('click', successAnswerPopupClickHandler);
  };

  var successAnswerPopupEscButtonHandler = function (evt) {
    if (window.utils.isKeyPressed.escape(evt)) {
      successAnswerPopup.parentNode.removeChild(successAnswerPopup);
      document.removeEventListener('keydown', successAnswerPopupEscButtonHandler);
    }
  };

  var errorPopupClickHandler = function () {
    errorPopup.parentNode.removeChild(errorPopup);
    document.removeEventListener('click', errorPopupClickHandler);
  };

  var errorPopupEscButtonHandler = function (evt) {
    if (window.utils.isKeyPressed.escape(evt)) {
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

    mainContent.appendChild(successAnswerPopup);

    document.addEventListener('click', successAnswerPopupClickHandler);
    document.addEventListener('keydown', successAnswerPopupEscButtonHandler);
  };

  var errorHandler = function (message) {
    errorMessage.textContent = ERROR_MESSAGE + message;
    mainContent.appendChild(errorPopup);

    document.addEventListener('click', errorPopupClickHandler);
    document.addEventListener('keydown', errorPopupEscButtonHandler);
    errorPopupCloseButton.addEventListener('click', errorPopupCloseButtonHandler);
  };

  // отправка данных на сервер с помощью AJAX
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(succeessHandler, errorHandler, new FormData(adForm));


  });

  // нажатие на "Очистить форму"
  adFormResetButton.addEventListener('click', function () {
    window.form.disable();
    window.map.activation.disable();
  });
})();
