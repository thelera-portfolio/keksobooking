'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var type = filters.querySelector('#housing-type');
  var price = filters.querySelector('#housing-price');
  var rooms = filters.querySelector('#housing-rooms');
  var guests = filters.querySelector('#housing-guests');
  var features = filters.querySelectorAll('input[name="features"]');

  var PriceRange = {
    LOW_PRICE: 'low',
    MIDDLE_PRICE: 'middle',
    HIGH_PRICE: 'high'
  };

  var getPriceRange = function (value) {
    if (value < 10000) {
      return PriceRange.LOW_PRICE;
    } else if (value > 50000) {
      return PriceRange.HIGH_PRICE;
    }
    return PriceRange.MIDDLE_PRICE;
  };

  window.filter = {
    // выводим только заданное количество объявлений
    amount: function (data, amount) {
      return data.slice(0, amount + 1);
    },
    set: function (data) {
      var filteredArray = data;
      window.card.close();

      if (type.value !== 'any') {
        filteredArray = filteredArray.filter(function (element) {
          return element.offer.type === type.value;
        });
      }

      if (price.value !== 'any') {
        filteredArray = filteredArray.filter(function (element) {
          return getPriceRange(element.offer.price) === price.value;
        });
      }

      if (rooms.value !== 'any') {
        filteredArray = filteredArray.filter(function (element) {
          return element.offer.rooms === Number(rooms.value);
        });
      }

      if (guests.value !== 'any') {
        filteredArray = filteredArray.filter(function (element) {
          return element.offer.guests === Number(guests.value);
        });
      }

      features = Array.from(features);
      features.forEach(function (feature) {
        if (feature.checked) {
          filteredArray = filteredArray.filter(function (element) {
            return element.offer.features.indexOf(feature.value) !== -1;
          });
        }
      });

      window.pin.remove();
      window.pin.draw(window.filter.amount(filteredArray, window.map.PIN_AMOUNT));// выводим только заданное количество объявлений
    },
  };
})();
