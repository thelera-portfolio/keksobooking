'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.utils = {
    // [minNumber, maxNumber]
    generateNumber: function (minNumber, maxNumber) {
      return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
    },
    isKeyPressed: {
      enter: function (evt) {
        return evt.keyCode === ENTER_KEYCODE;
      },
      escape: function (evt) {
        return evt.keyCode === ESC_KEYCODE;
      }
    }
  };
})();
