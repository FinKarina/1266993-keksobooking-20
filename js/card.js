'use strict';
window.card = (function () {

  var ACCOMODATION = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var templateCardElement = document.querySelector('#card').content;

  return {
    getElementCard: function (object) {
      var newElement = templateCardElement.cloneNode(true);

      newElement.querySelector('.popup__title').textContent = object.offer.title;
      newElement.querySelector('.popup__text--address').textContent = object.offer.address;
      newElement.querySelector('.popup__text--price').textContent = object.offer.price + '\u20bd/ночь';
      newElement.querySelector('.popup__type').textContent = ACCOMODATION[object.offer.type];
      newElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнат для ' + object.offer.guests + ' гостей';
      newElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
      pushItemInList(newElement);
      newElement.querySelector('.popup__description').textContent = object.offer.description;
      pushImagesInPopupPhotos(newElement);
      newElement.querySelector('.popup__avatar').setAttribute('src', object.author.avatar);
      var elementFields = Array.from(newElement.firstElementChild.children);
      elementFields.forEach(function (element) {
        if (!element.innerHTML && element.nodeName !== 'IMG') {
          element.style.display = 'none';
        }
      });
      return newElement.firstElementChild;

      function pushItemInList(element) {
        var popupFeaturesElement = element.querySelector('.popup__features');
        var fragment = document.createDocumentFragment();
        for (var j = 0; j < object.offer.features.length; j++) {
          var liElement = document.createElement('li');
          liElement.setAttribute('class', 'popup__feature popup__feature--' + object.offer.features[j]);
          liElement.textContent = object.offer.features[j];
          fragment.appendChild(liElement);
        }
        popupFeaturesElement.innerHTML = '';
        popupFeaturesElement.appendChild(fragment);
      }

      function pushImagesInPopupPhotos(element) {
        var popupPhotosElement = element.querySelector('.popup__photos');
        var popupPhotoElement = element.querySelector('.popup__photo');
        var fragment = document.createDocumentFragment();
        for (var l = 0; l < object.offer.photos.length; l++) {
          popupPhotoElement.setAttribute('src', object.offer.photos[l]);
          fragment.appendChild(popupPhotoElement.cloneNode(true));
        }
        popupPhotosElement.innerHTML = '';
        popupPhotosElement.appendChild(fragment);
      }
    }
  };

})();
