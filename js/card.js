'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ACCOMODATION_SETTINGS = {
    palace: {
      label: 'дворец',
      price: 10000
    },
    flat: {
      label: 'квартира',
      price: 1000
    },
    house: {
      label: 'дом',
      price: 5000
    },
    bungalo: {
      label: 'бунгало',
      price: 0
    }
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // карточка объявления
  window.card = {
    create: function (listing) {
      var card = cardTemplate.cloneNode(true);
      var title = card.querySelector('.popup__title');
      var address = card.querySelector('.popup__text--address');
      var price = card.querySelector('.popup__text--price');
      var type = card.querySelector('.popup__type');
      var capacity = card.querySelector('.popup__text--capacity');
      var visitTime = card.querySelector('.popup__text--time');
      var featuresList = card.querySelector('.popup__features');
      var features = featuresList.querySelectorAll('.popup__feature');
      var description = card.querySelector('.popup__description');
      var photosList = card.querySelector('.popup__photos');
      var photo = photosList.querySelector('.popup__photo');
      var avatar = card.querySelector('.popup__avatar');

      title.textContent = listing.offer.title;

      if (listing.offer.address) {
        address.remove();
      }
      address.textContent = listing.offer.address;

      if (!listing.offer.price) {
        price.remove();
      }
      price.textContent = listing.offer.price + '₽/ночь';

      if (!listing.offer.rooms || !listing.offer.guests) {
        capacity.remove();
      }
      capacity.textContent = listing.offer.rooms + ' комнаты для ' + listing.offer.guests + ' гостей';

      if (!listing.offer.checkin || !listing.offer.checkout) {
        visitTime.remove();
      }
      visitTime.textContent = 'Заезд после ' + listing.offer.checkin + ', выезд до ' + listing.offer.checkout;

      if (!listing.offer.description) {
        description.remove();
      }
      description.textContent = listing.offer.description;

      if (!listing.author.avatar) {
        avatar.remove();
      }
      avatar.src = listing.author.avatar;

      type.textContent = ACCOMODATION_SETTINGS[listing.offer.type].label;

      if (!listing.offer.features || listing.offer.features.length === 0) {
        featuresList.remove();
      }
      // удаляем из склонированного шаблона удобства, которых нет в данной карточке
      for (var i = 0; i < FEATURES.length; i++) {
        var count = 0;
        for (var j = 0; j < listing.offer.features.length; j++) {
          if (FEATURES[i] === listing.offer.features[j]) {
            count += 1;
          }
        }
        if (count === 0) {
          features[i].remove();
        }
      }

      if (!listing.offer.photos || listing.offer.photos.length === 0) {
        photosList.remove();
      }

      photo.src = listing.offer.photos[0];
      for (var k = 1; k < listing.offer.photos.length; k++) {
        var newPhoto = photo.cloneNode();
        photosList.appendChild(newPhoto);
        newPhoto.src = listing.offer.photos[k];
      }

      return card;
    }
  };
})();
