'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var mapMainPin = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters');
  var filtersContainer = map.querySelector('.map__filters-container');
  var similarOffers;

  // в случае успешной загрузки данных с сервера
  var successHandler = function (offerData) {
    similarOffers = offerData;

    for (var i = 0; i < similarOffers.length; i++) {
      similarOffers[i].id = i;
    }

    // переход в активный режим
    mapActivation.enable();
    window.form.enable();
    window.address.set();

    // показ карточки при клике на пин
    mapPinsList.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('map__pin')) {
        var clickedPin = evt.target;
      } else if (evt.target.parentElement.classList.contains('map__pin')) {
        clickedPin = evt.target.parentElement;
      }

      var previousCard = map.querySelector('.map__card');
      if (clickedPin && !isSamePinClicked(previousCard, clickedPin)) {
        openOfferCard(clickedPin, similarOffers);
      }
    });

    mapPinsList.addEventListener('keydown', function (evt) {
      if (evt.target.classList.contains('map__pin')) {
        var clickedPin = evt.target;
      } else if (evt.target.parentElement.classList.contains('map__pin')) {
        clickedPin = evt.target.parentElement;
      }

      var previousCard = map.querySelector('.map__card');
      if (evt.key === ENTER_KEY && !isSamePinClicked(previousCard, clickedPin)) {
        openOfferCard(clickedPin, similarOffers);
      }
    });

    mapMainPin.addEventListener('keydown', function (evt) {
      evt.stopPropagation();
    });

    mapMainPin.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

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

  var offerCardCloseButtonHandler = function () {
    closeOfferCard();
  };

  var offerCardEcsPressHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closeOfferCard();
    }
  };

  var openOfferCard = function (target, offerData) {
    closeOfferCard();

    var id = Number(target.dataset.id);
    var targetOffer = offerData.find(function (offer) {
      return offer.id === id;
    });

    map.insertBefore(window.card.create(targetOffer), filtersContainer);

    var card = map.querySelector('.map__card');
    var cardCloseButton = card.querySelector('.popup__close');
    card.dataset.id = id;
    cardCloseButton.addEventListener('click', offerCardCloseButtonHandler);
    document.addEventListener('keydown', offerCardEcsPressHandler);
  };

  var closeOfferCard = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
      card.removeEventListener('click', offerCardCloseButtonHandler);
      document.removeEventListener('keydown', offerCardEcsPressHandler);
    }
  };

  var isSamePinClicked = function (card, pin) {
    return (card && card.dataset.id === pin.dataset.id);
  };

  var isActive = false;

  var mapActivation = {
    enable: function () {
      isActive = true;

      if (mapPinsList.children.length < similarOffers.length) {
        mapPinsList.appendChild(window.pin.createList(similarOffers));
      }

      map.classList.remove('map--faded');

      mapFilters.classList.remove('map__filters--disabled');
    },
    disable: function () {
      for (var i = 0; i < mapPinsList.children.length; i++) {
        mapPinsList.removeChild(mapPinsList.children[0]);
      }

      map.classList.add('map--faded');

      mapFilters.classList.add('map__filters--disabled');
    }
  };

  window.address.set();

  // загружаем данные с сервера при клике на главный пин
  mapMainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && !isActive) {
      window.backend.load(successHandler, errorHandler);
    }
  });

  mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY && !isActive) {
      window.backend.load(successHandler, errorHandler);
    }
  });
})();
