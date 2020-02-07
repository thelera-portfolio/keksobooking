'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var AMOUNT_OF_LISTINGS = 8;

  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var mapMainPin = map.querySelector('.map__pin--main');
  var filtersContainer = map.querySelector('.map__filters-container');
  var similarListings = window.data.createListing(AMOUNT_OF_LISTINGS);

  window.form.setPinAddress();

  mapMainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.activeState.set();
      window.form.setPinAddress();
    }
  });

  mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      window.activeState.set();
      window.form.setPinAddress();
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

  mapPinsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('map__pin')) {
      var clickedPin = evt.target;
    } else if (evt.target.parentElement.classList.contains('map__pin')) {
      clickedPin = evt.target.parentElement;
    }

    if (clickedPin) {
      openListingCard(clickedPin, similarListings);
    }
  });

  mapPinsList.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains('map__pin')) {
      var clickedPin = evt.target;
    } else if (evt.target.parentElement.classList.contains('map__pin')) {
      clickedPin = evt.target.parentElement;
    }

    if (evt.key === ENTER_KEY && clickedPin) {
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
