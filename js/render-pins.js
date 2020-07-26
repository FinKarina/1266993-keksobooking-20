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
    for (var i = 0; i < filteredObjects.length; i++) {
      var newElement = window.pin.getElementPin(templatePinElement, filteredObjects[i]);
      newElement.querySelector('.map__pin').addEventListener('click', onMapPinClick);
      newElement.querySelector('.map__pin').addEventListener('keydown', onMapPinKeyDown);
      fragment.appendChild(newElement);
    }
    mapPinsElement.appendChild(fragment);

    mapPinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  }

  function onMapPinClick(evt) {
    openCard(evt);
  }

  function onMapPinKeyDown(evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      openCard(evt);
    }
  }

  function openCard(evt) {
    var targetElement;

    if (evt.target.nodeName === 'BUTTON') {
      activeElement = evt.target;
      targetElement = evt.target.querySelector('img');
    } else {
      activeElement = evt.target.parentNode;
      targetElement = evt.target;
    }
    var altAttribute = targetElement.alt;
    for (var k = 0; k < filteredObjects.length; k++) {

      mapPinsElements[k].classList.remove('map__pin--active');

      if (filteredObjects[k].offer.title === altAttribute) {
        var cardElement = window.card.getElementCard(filteredObjects[k]);
        if (document.querySelector('.map__card')) {
          closeCard();
        }
        mapPinsElement.insertAdjacentElement('afterend', cardElement);
      }
    }
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
    var startIndexForRemoving = 2;
    while (count < countElement - startIndexForRemoving) {
      mapPinsElement.removeChild(mapPinsElementChildrens[startIndexForRemoving]);
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
