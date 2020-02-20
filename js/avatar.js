'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var avatarInput = document.querySelector('#avatar');
  var avatarPicture = document.querySelector('.ad-form-header__avatar');

  avatarInput.addEventListener('change', function () {
    var file = avatarInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPicture.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();
