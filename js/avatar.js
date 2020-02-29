'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  var PhotoSettings = {
    WIDTH: '70px',
    HEIGHT: '70px',
    ALT_MESSAGE: 'Фотография жилья'
  };

  var avatarInput = document.querySelector('#avatar');
  var avatarPicture = document.querySelector('.ad-form-header__avatar');

  var accomodationImageInput = document.querySelector('#images');
  var accomodationImage = document.querySelector('.ad-form__photo');

  var setFileReader = function (input, picture) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (picture.src) {
          picture.src = reader.result;
        } else {
          var photoContainer = document.querySelector('.ad-form__photo-container');
          var photo = picture.cloneNode();
          var img = document.createElement('img');
          photoContainer.appendChild(photo);
          photo.appendChild(img);
          img.src = reader.result;
          img.style.width = PhotoSettings.WIDTH;
          img.style.height = PhotoSettings.HEIGHT;
          img.style.alt = PhotoSettings.ALT_MESSAGE;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  avatarInput.addEventListener('change', function () {
    setFileReader(avatarInput, avatarPicture);
  });

  accomodationImageInput.addEventListener('change', function () {
    setFileReader(accomodationImageInput, accomodationImage);
  });

  window.avatarRemove = function () {
    avatarPicture.src = 'img/muffin-grey.svg';
    var accomodationPhotos = Array.from(document.querySelectorAll('.ad-form__photo'));
    accomodationPhotos.forEach(function (photo, index) {
      if (index !== 0) {
        photo.remove();
      }
    });
  };
})();
