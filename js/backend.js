'use strict';

(function () {
  var statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };
  var TIMEOUT_IN_MS = 10000;
  var URL_LOAD = ' https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/code-and-magick/';

  window.backend = {
    load: function (loadHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;

        switch (xhr.status) {
          case statusCode.OK:
            loadHandler(xhr.response);
            break;
          case statusCode.BAD_REQUEST:
            error = 'Неверный запрос';
            break;
          case statusCode.UNAUTHORIZED:
            error = 'Пользователь не авторизован';
            break;
          case statusCode.NOT_FOUND:
            error = 'Ничего не найдено';
            break;
          default:
            error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
        }

        if (error) {
          errorHandler(error);
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        errorHandler('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;// 10 sec

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    save: function () {

    }
  }
})();