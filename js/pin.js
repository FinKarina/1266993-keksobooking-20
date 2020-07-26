'use strict';
window.pin = (function () {

  return {
    getElementPin: function (sample, object) {
      var newElement = sample.cloneNode(true);
      var mapPinElement = newElement.querySelector('.map__pin');
      var imgElement = newElement.querySelector('img');

      var offsetX = 50 / 2;
      var offsetY = 70;

      mapPinElement.style.left = object.location.x - offsetX + 'px';
      mapPinElement.style.top = object.location.y - offsetY + 'px';

      imgElement.setAttribute('src', object.author.avatar);

      imgElement.setAttribute('alt', object.offer.title);

      return newElement;
    },
  };

})();

