'use strict';

(function () {
  var ENTER_KEYCODE = 'Enter';
  var ESC_KEYCODE = 'Escape';

  window.utils = {
    // [minNumber, maxNumber]
    generateNumber: function (minNumber, maxNumber) {
      return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
    },
    isKeyPressed: {
      enter: function (evt) {
        return evt.key === ENTER_KEYCODE;
      },
      escape: function (evt) {
        return evt.key === ESC_KEYCODE;
      }
    }
  };
})();
