'use strict';

(function () {
  window.utils = {
    // [minNumber, maxNumber]
    generateNumber: function (minNumber, maxNumber) {
      return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
    },
    generateUniqueArray: function (array, length) {
      var newArray = [];

      for (var i = 0; i < length; i++) {
        newArray.push(array[i]);
      }

      return newArray;
    }
  };
})();
