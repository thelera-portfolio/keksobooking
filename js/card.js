'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var accomadationSettingsMap = {
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

  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var createCard = function (cardData) {
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

    title.textContent = cardData.offer.title;

    if (cardData.offer.address) {
      address.remove();
    }
    address.textContent = cardData.offer.address;

    if (!cardData.offer.price) {
      price.remove();
    }
    price.textContent = cardData.offer.price + '₽/ночь';

    if (!cardData.offer.rooms || !cardData.offer.guests) {
      capacity.remove();
    }
    capacity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';

    if (!cardData.offer.checkin || !cardData.offer.checkout) {
      visitTime.remove();
    }
    visitTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

    if (!cardData.offer.description) {
      description.remove();
    }
    description.textContent = cardData.offer.description;

    if (!cardData.author.avatar) {
      avatar.remove();
    }
    avatar.src = cardData.author.avatar;

    type.textContent = accomadationSettingsMap[cardData.offer.type].label;

    if (!cardData.offer.features || cardData.offer.features.length === 0) {
      featuresList.remove();
    }
    // удаляем из склонированного шаблона удобства, которых нет в данной карточке
    for (var i = 0; i < FEATURES.length; i++) {
      var count = 0;
      for (var j = 0; j < cardData.offer.features.length; j++) {
        if (FEATURES[i] === cardData.offer.features[j]) {
          count += 1;
        }
      }
      if (count === 0) {
        features[i].remove();
      }
    }

    if (!cardData.offer.photos || cardData.offer.photos.length === 0) {
      photosList.remove();
    }

    photo.src = cardData.offer.photos[0];

    for (var k = 1; k < cardData.offer.photos.length; k++) {
      var cardPhoto = photo.cloneNode();
      photosList.appendChild(cardPhoto);
      cardPhoto.src = cardData.offer.photos[k];
    }

    return card;
  };

  var offerCardCloseButtonHandler = function () {
    window.card.close();
  };

  var offerCardEcsPressHandler = function (evt) {
    if (window.utils.isKeyPressed.escape(evt)) {
      window.card.close();
    }
  };

  // карточка объявления
  window.card = {
    open: function (target, offerData) {
      window.card.close();

      var id = Number(target.dataset.id);
      var targetOffer = offerData.find(function (offer) {
        return offer.id === id;
      });

      map.insertBefore(createCard(targetOffer), filtersContainer);

      var card = map.querySelector('.map__card');
      var cardCloseButton = card.querySelector('.popup__close');
      card.dataset.id = id;
      cardCloseButton.addEventListener('click', offerCardCloseButtonHandler);
      document.addEventListener('keydown', offerCardEcsPressHandler);
    },
    close: function () {
      var card = map.querySelector('.map__card');

      // у пина удаляем класс 'map__pin--active'
      var pins = map.querySelectorAll('.map__pin');
      Array.from(pins).forEach(function (pin) {
        if (pin.classList.contains('map__pin--active')) {
          pin.classList.remove('map__pin--active');
        }
      });
      if (card) {
        card.remove();
        card.removeEventListener('click', offerCardCloseButtonHandler);
        document.removeEventListener('keydown', offerCardEcsPressHandler);
      }
    }
  };
})();
