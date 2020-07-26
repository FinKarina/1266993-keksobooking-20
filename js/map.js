'use strict';
window.map = (function () {

  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapPinsElement = document.querySelector('.map__pins');
  var mapElement = document.querySelector('.map');

  var startLocationMapPinMainElement = {
    x: mapPinMainElement.offsetLeft,
    y: mapPinMainElement.offsetTop
  };

  var boundMainPin = {
    upper: 48,
    lower: 548,
    left: -33,
    right: 1167
  };

  function onMapPinMainMouseDown(evtMouseDown) {
    if (evtMouseDown.button === 0) {
      evtMouseDown.preventDefault();

      var startCoords = {
        x: evtMouseDown.clientX,
        y: evtMouseDown.clientY
      };

      mapPinsElement.addEventListener('mousemove', onMapMouseMove);
      mapPinsElement.addEventListener('mouseup', onMapMouseUp);
    }

    function onMapMouseMove(evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      switch (true) {
        case (mapPinMainElement.offsetTop - shift.y) <= boundMainPin.upper:
          mapPinMainElement.style.top = boundMainPin.upper + 'px';
          break;
        case (mapPinMainElement.offsetTop - shift.y) >= boundMainPin.lower:
          mapPinMainElement.style.top = boundMainPin.lower + 'px';
          break;
        case (mapPinMainElement.offsetLeft - shift.x) <= boundMainPin.left:
          mapPinMainElement.style.left = boundMainPin.left + 'px';
          break;
        case (mapPinMainElement.offsetLeft - shift.x) >= boundMainPin.right:
          mapPinMainElement.style.left = boundMainPin.right + 'px';
          break;
        default:
          mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
          mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + 'px';
      }

      window.formPage.setAddressValue(true, mapPinMainElement, window.formPage.addressElement);

      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };
    }

    function onMapMouseUp(evtUp) {
      evtUp.preventDefault();

      mapPinsElement.removeEventListener('mousemove', onMapMouseMove);
      mapPinsElement.removeEventListener('mouseup', onMapMouseUp);
    }
  }

  function onMapPinMainElementEnter(evt) {
    if (evt.key === 'Enter') {
      window.main.switchToActiveModePage();
    }
  }

  function onMapPinMainElementMouseDown(evtClick) {
    if (evtClick.button === 0) {
      window.main.switchToActiveModePage();
    }
  }

  return {
    mapPinMainElement: mapPinMainElement,
    mapPinsElement: mapPinsElement,
    resetMap: function () {

      mapPinMainElement.style.left = startLocationMapPinMainElement.x + 'px';
      mapPinMainElement.style.top = startLocationMapPinMainElement.y + 'px';

      window.renderPins.deletePins();

      if (document.querySelector('.map__card')) {
        document.querySelector('.map__card').remove();
      }

      document.removeEventListener('keydown', window.renderPins.onPopupEscape);

      window.filterForm.resetFilterForm();
    },

    switchMapToNoActive: function () {

      if (!mapElement.classList.contains('map--faded')) {
        mapElement.classList.add('map--faded');
      }

      window.filterForm.setDisableOnFilterFormInputs();

      mapPinMainElement.addEventListener('mousedown', onMapPinMainElementMouseDown);
      mapPinMainElement.addEventListener('keydown', onMapPinMainElementEnter);
      mapPinMainElement.addEventListener('mousedown', onMapPinMainMouseDown);
    },

    switchMapToActive: function () {
      mapElement.classList.remove('map--faded');

      window.renderPins.pushElementsInPage();

      mapPinMainElement.removeEventListener('mousedown', onMapPinMainElementMouseDown);
      mapPinMainElement.removeEventListener('keydown', onMapPinMainElementEnter);

      window.filterForm.setFilterToActive();
    },
  };

})();
