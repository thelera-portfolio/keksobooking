'use strict';

(function () {
  var accomodationType = document.querySelector('#housing-type');

  window.filter = {
    // выводим только заданное количество объявлений
    amount: function (data, amount) {
      return data.slice(0, amount + 1);
    },
    // фильтрация по типу жилья
    type: function (data) {
      var filteredArray;
      accomodationType.addEventListener('change', function () {
        window.card.close();

        if (accomodationType.value === 'any') {
          filteredArray = window.filter.amount(data, window.map.PIN_AMOUNT);
        } else {
          filteredArray = data.filter(function (element) {
            return element.offer.type === accomodationType.value;
          });
        }

        window.pin.remove();
        window.pin.draw(filteredArray);
      });
    }
  };
})();
