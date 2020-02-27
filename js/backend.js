'use strict';

(function () {
  var StatusCode = {
    OK: {code: 200},
    BAD_REQUEST: {code: 400, errorMessage: 'Неверный запрос'},
    UNAUTHORIZED: {code: 401, errorMessage: 'Пользователь не авторизован'},
    NOT_FOUND: {code: 404, errorMessage: 'Ничего не найдено'},
    DEFAULT: {errorMessage: 'Статус ответа: '}
  };
  var CONNECTION_ERROR = 'Произошла ошибка соединения';
  var TIMEOUT_ERROR = 'Запрос не успел выполниться за ';
  var TIMEOUT = 10000;// 10 sec
  var URL_LOAD = ' https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var GET_METHOD = 'GET';
  var POST_METHOD = 'POST';

  var createRequest = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case StatusCode.OK.code:
          successHandler(xhr.response);
          break;
        case StatusCode.BAD_REQUEST.code:
          error = StatusCode.BAD_REQUEST.errorMessage;
          break;
        case StatusCode.UNAUTHORIZED.code:
          error = StatusCode.UNAUTHORIZED.errorMessage;
          break;
        case StatusCode.NOT_FOUND.code:
          error = StatusCode.NOT_FOUND.errorMessage;
          break;
        default:
          error = StatusCode.DEFAULT.errorMessage + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        errorHandler(error);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(CONNECTION_ERROR);
    });

    xhr.addEventListener('timeout', function () {
      errorHandler(TIMEOUT_ERROR + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.backend = {
    load: function (successHandler, errorHandler) {
      var xhr = createRequest(successHandler, errorHandler);

      xhr.open(GET_METHOD, URL_LOAD);
      xhr.send();
    },
    save: function (successHandler, errorHandler, data) {
      var xhr = createRequest(successHandler, errorHandler);

      xhr.open(POST_METHOD, URL_UPLOAD);
      xhr.send(data);
    }
  };
})();
