'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var mapMainPin = map.querySelector('.map__pin--main');
  var filters = document.querySelector('.map__filters');
  var similarOffers;
  var reducedOffers;
  var startLocation;

  // в случае успешной загрузки данных с сервера
  var successHandler = function (offerData) {
    similarOffers = offerData;

    similarOffers.forEach(function (offer, index) {
      offer.id = index;
    });

    reducedOffers = window.filter.amount(similarOffers, window.map.PIN_AMOUNT);
    // переход в активный режим
    window.map.activation.enable();
    window.form.enable();
    window.address.set();
  };

  // фильтрация объявлений
  filters.addEventListener('change', function () {
    window.debounce(function () {
      window.filter.set(similarOffers);
    });
  });

  // показ карточки при клике на пин
  mapPinsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('map__pin')) {
      var clickedPin = evt.target;
    } else if (evt.target.parentElement.classList.contains('map__pin')) {
      clickedPin = evt.target.parentElement;
    }

    var previousCard = map.querySelector('.map__card');
    if (clickedPin && !isSamePinClicked(previousCard, clickedPin)) {
      window.card.open(clickedPin, similarOffers);
      clickedPin.classList.add('map__pin--active');
    }
  });

  mapPinsList.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains('map__pin')) {
      var clickedPin = evt.target;
    } else if (evt.target.parentElement.classList.contains('map__pin')) {
      clickedPin = evt.target.parentElement;
    }

    var previousCard = map.querySelector('.map__card');
    if (window.utils.isKeyPressed.enter && !isSamePinClicked(previousCard, clickedPin)) {
      window.card.open(clickedPin, similarOffers);
      clickedPin.classList.add('map__pin--active');
    }
  });

  mapMainPin.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  mapMainPin.addEventListener('click', function (evt) {
    evt.stopPropagation();
  });

  var errorHandler = function (errorMessage) {
    var errorPopup = document.createElement('div');
    errorPopup.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorPopup.style.position = 'absolute';
    errorPopup.style.left = 0;
    errorPopup.style.right = 0;
    errorPopup.style.fontSize = '30px';

    errorPopup.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorPopup);
  };

  var isSamePinClicked = function (card, pin) {
    return (card && card.dataset.id === pin.dataset.id);
  };

  var isActive = false;

  window.map = {
    PIN_AMOUNT: 5,
    activation: {
      enable: function () {
        isActive = true;

        window.pin.draw(reducedOffers);
        map.classList.remove('map--faded');
        window.filter.enable();
      },
      disable: function () {
        window.pin.remove();
        map.classList.add('map--faded');
        window.filter.disable();
        window.address.setStartLocation(startLocation);
        window.card.close();

        isActive = false;
      }
    }
  };

  window.address.set();

  // загружаем данные с сервера при клике на главный пин
  startLocation = window.address.getStartLocation();
  mapMainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && !isActive) {
      window.backend.load(successHandler, errorHandler);
    }
  });

  mapMainPin.addEventListener('keydown', function (evt) {
    if (window.utils.isKeyPressed.enter(evt) && !isActive) {
      window.backend.load(successHandler, errorHandler);
    }
  });
})();
