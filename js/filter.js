'use strict';

(function () {
  var PriceRange = {
    LOW_PRICE: 'low',
    MIDDLE_PRICE: 'middle',
    HIGH_PRICE: 'high'
  };
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var filtersList = document.querySelector('.map__filters');
  var filters = filtersList.children;
  var type = filtersList.querySelector('#housing-type');
  var price = filtersList.querySelector('#housing-price');
  var rooms = filtersList.querySelector('#housing-rooms');
  var guests = filtersList.querySelector('#housing-guests');

  var getPriceRange = function (value) {
    if (value < MIN_PRICE) {
      return PriceRange.LOW_PRICE;
    } else if (value > MAX_PRICE) {
      return PriceRange.HIGH_PRICE;
    }
    return PriceRange.MIDDLE_PRICE;
  };

  window.filter = {
    // выводим только заданное количество объявлений
    amount: function (data, amount) {
      return data.slice(0, amount);
    },
    set: function (data) {
      var filteredArray = data;
      var selectedFeatures = filtersList.querySelectorAll('input[name="features"]:checked');
      var featuresArray = Array.from(selectedFeatures).map(function (featureInput) {
        return featureInput.value;
      });
      window.card.close();

      filteredArray = filteredArray.filter(function (element) {
        var offerFeatures = element.offer.features;
        var isTypeMatched = type.value === 'any' ? true : element.offer.type === type.value;
        var isPriceMatched = price.value === 'any' ? true : getPriceRange(element.offer.price) === price.value;
        var isRoomsMatched = rooms.value === 'any' ? true : element.offer.rooms === Number(rooms.value);
        var isGuestsMatched = guests.value === 'any' ? true : element.offer.guests === Number(guests.value);
        var isFeatureMatched = featuresArray.every(function (feature) {
          return offerFeatures.includes(feature);
        });

        return (isTypeMatched && isPriceMatched && isRoomsMatched && isGuestsMatched && isFeatureMatched);
      });

      window.pin.remove();
      window.pin.draw(window.filter.amount(filteredArray, window.map.PIN_AMOUNT));// выводим только заданное количество объявлений
    },
    enable: function () {
      Array.from(filters).forEach(function (filter) {
        filter.removeAttribute('disabled', 'disabled');
      });
    },
    disable: function () {
      filtersList.reset();
      Array.from(filters).forEach(function (filter) {
        filter.setAttribute('disabled', 'disabled');
      });
    }
  };
  window.filter.disable();
})();
