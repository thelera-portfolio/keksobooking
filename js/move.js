'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var X_OFFSET_MAIN_PIN = MAIN_PIN_WIDTH / 2;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var map = document.querySelector('.map');
  var mapMainPin = map.querySelector('.map__pin--main');
  var mapWidth = map.clientWidth;

  // перемещение главной метки
  mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandle = function (evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: evtMove.clientX - startCoords.x,
        y: evtMove.clientY - startCoords.y
      };

      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      mapMainPin.style.left = (mapMainPin.offsetLeft + shift.x) + 'px';
      mapMainPin.style.top = (mapMainPin.offsetTop + shift.y) + 'px';

      window.address.set();

      // органичение перемещения метки
      if (mapMainPin.offsetLeft <= -X_OFFSET_MAIN_PIN) {
        mapMainPin.style.left = -X_OFFSET_MAIN_PIN + 'px';
      }

      if (mapMainPin.offsetLeft >= (mapWidth - X_OFFSET_MAIN_PIN)) {
        mapMainPin.style.left = (mapWidth - X_OFFSET_MAIN_PIN) + 'px';
      }

      if (mapMainPin.offsetTop <= Y_MIN) {
        mapMainPin.style.top = Y_MIN + 'px';
      }

      if (mapMainPin.offsetTop >= (Y_MAX - MAIN_PIN_HEIGHT)) {
        mapMainPin.style.top = ((Y_MAX - MAIN_PIN_HEIGHT)) + 'px';
      }
    };

    var mouseUpHandle = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandle);
      document.removeEventListener('mouseup', mouseUpHandle);
    };

    document.addEventListener('mousemove', mouseMoveHandle);
    document.addEventListener('mouseup', mouseUpHandle);
  });
})();
