'use strict';

(function () {
  var AMOUNT_OF_LISTINGS = 8;

  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var mapFilters = map.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormElementFieldsets = adForm.querySelectorAll('.ad-form__element');
  var adFormHeaderFieldset = adForm.querySelector('.ad-form-header');
  var similarListings = window.data.createListing(AMOUNT_OF_LISTINGS);

  // перевод страницы в активный режим
  window.activeState = {
    set: function () {
      if (mapPinsList.children.length < similarListings.length) {
        mapPinsList.appendChild(window.pin.createList(similarListings));
      }

      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      mapFilters.classList.remove('map__filters--disabled');

      for (var i = 0; i < adFormElementFieldsets.length; i++) {
        adFormElementFieldsets[i].removeAttribute('disabled', 'disabled');
      }
      adFormHeaderFieldset.removeAttribute('disabled', 'disabled');
    }
  };
})();
