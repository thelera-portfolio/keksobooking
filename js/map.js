'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var AMOUNT_OF_LISTINGS = 8;

  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var mapMainPin = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters');
  var filtersContainer = map.querySelector('.map__filters-container');
  var similarListings = window.data.createListing(AMOUNT_OF_LISTINGS);

  var isActive = false;

  var mapActivation = {
    enable: function () {
      isActive = true;

      if (mapPinsList.children.length < similarListings.length) {
        mapPinsList.appendChild(window.pin.createList(similarListings));
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

  // переход в активный режим при клике на пин
  mapMainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && !isActive) {
      mapActivation.enable();
      window.form.enable();
      window.address.set();
    }
  });

  mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY && !isActive) {
      mapActivation.enable();
      window.form.enable();
      window.address.set();
    }
  });

  // показ карточки при клике на пин
  var listingCardCloseButtonHandler = function () {
    closeListingCard();
  };

  var listingCardEcsPressHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closeListingCard();
    }
  };

  var openListingCard = function (target, listings) {
    closeListingCard();

    var id = Number(target.dataset.id);
    var targetListing = listings.find(function (offer) {
      return offer.id === id;
    });

    map.insertBefore(window.card.create(targetListing), filtersContainer);

    var card = map.querySelector('.map__card');
    card.dataset.id = id;
    card.addEventListener('click', listingCardCloseButtonHandler);
    document.addEventListener('keydown', listingCardEcsPressHandler);
  };

  var closeListingCard = function () {

    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
      card.removeEventListener('click', listingCardCloseButtonHandler);
      document.removeEventListener('keydown', listingCardEcsPressHandler);
    }
  };
  var isSamePinClicked = function (card, pin) {
    return (card && card.dataset.id === pin.dataset.id) ? true : false;
  };

  mapPinsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('map__pin')) {
      var clickedPin = evt.target;
    } else if (evt.target.parentElement.classList.contains('map__pin')) {
      clickedPin = evt.target.parentElement;
    }

    var previousCard = map.querySelector('.map__card');
    if (clickedPin && !isSamePinClicked(previousCard, clickedPin)) {
      openListingCard(clickedPin, similarListings);
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
      openListingCard(clickedPin, similarListings);
    }
  });

  mapMainPin.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  mapMainPin.addEventListener('click', function (evt) {
    evt.stopPropagation();
  });
})();
