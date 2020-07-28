'use strict';
window.renderPins = (function () {
  var MAX_COUNT_PIN = 5;
  var objects = [];
  var filteredObjects = [];
  var mapPinsElements = [];
  var activeElement;
  var mapPinsElement = window.map.mapPinsElement;
  function onLoad(response) {

    for (var i = 0; i < response.length; i++) {
      if (response[i].offer) {
        objects[i] = response[i];
      } else {
        continue;
      }
    }
    if (objects.length) {
      window.filterForm.removeDisableFromFilterForm();
    }

    renderPins();
  }

  function onError(error) {
    throw new Error(error);
  }

  function renderPins(filteredObjectsFromFilterForm) {


    if (!filteredObjectsFromFilterForm) {
      filteredObjects = objects.slice(0, MAX_COUNT_PIN);
    } else {
      filteredObjects = filteredObjectsFromFilterForm;
    }

    if (mapPinsElements.length) {
      deletePins();
    }

    if (document.querySelector('.map__card')) {
      closeCard();
    }

    var templatePinElement = document.querySelector('#pin').content;
    var fragment = document.createDocumentFragment();

    filteredObjects.forEach(function (offer) {
      var newElement = window.pin.getElementPin(templatePinElement, offer);
      newElement.querySelector('.map__pin').addEventListener('click', function (evt) {
        onMapPinClick(evt, offer);
      });
      newElement.querySelector('.map__pin').addEventListener('keydown', function (evt) {
        onMapPinKeyDown(evt, offer);
      });
      fragment.appendChild(newElement);
    });

    mapPinsElement.appendChild(fragment);
    mapPinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  }

  function onMapPinClick(evt, offer) {
    openCard(evt, offer);
  }

  function onMapPinKeyDown(evt, offer) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      openCard(evt, offer);
    }
  }

  function openCard(evt, offer) {

    if (evt.target.nodeName === 'BUTTON') {
      activeElement = evt.target;
    } else {
      activeElement = evt.target.parentNode;
    }

    if (document.querySelector('.map__card')) {
      closeCard();
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
    var cardElement = window.card.getElementCard(offer);
    mapPinsElement.insertAdjacentElement('afterend', cardElement);
    cardElement.querySelector('.popup__close').addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onPopupEscape);
    activeElement.classList.add('map__pin--active');
  }
  function onPopupClick() {
    closeCard();
  }

  function onPopupEscape(evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  }

  function closeCard() {
    document.removeEventListener('keydown', onPopupEscape);
    document.querySelector('.map__card').remove();
    activeElement.classList.remove('map__pin--active');
  }
  function deletePins() {
    var mapPinsElementChildrens = mapPinsElement.children;
    var countElement = mapPinsElementChildrens.length;
    var count = 0;
    var START_INDEX_FOR_REMOVING = 2;
    while (count < countElement - START_INDEX_FOR_REMOVING) {
      mapPinsElement.removeChild(mapPinsElementChildrens[START_INDEX_FOR_REMOVING]);
      count++;
    }
  }

  return {
    objects: objects,
    pushElementsInPage: function () {
      window.backend.load(onLoad, onError);
    },

    deletePins: deletePins,
    onPopupEscape: onPopupEscape,
    renderPins: renderPins
  };
})();
