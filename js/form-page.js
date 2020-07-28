'use strict';
window.formPage = (function () {

  var WIDTH_MARK = 65;
  var HEIGHT_MARK = 82;
  var adFormElement = document.querySelector('.ad-form');
  var addressElement = document.querySelector('#address');
  var adFormSubmitElement = document.querySelector('.ad-form__submit');
  var adFormResetElement = document.querySelector('.ad-form__reset');
  var mapPinMainElement = window.map.mapPinMainElement;
  var addressElementRegime = {
    noActive: false,
    active: true
  };

  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var minPriceForHouse = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var wrongMessage = {
    1: '1 комната — для 1 гостя',
    2: '2 комнаты — для 2 гостей или для 1 гостя',
    3: '3 комнаты — для 3 гостей, для 2 гостей или для 1 гостя',
    100: '100 комнат — не для гостей'
  };

  var titleElement = document.querySelector('#title');
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var countRoom = 1;
  var countGuest = 1;

  function onRoomNumberElementInput(evt) {
    checkRoomsToGuests(evt);
  }

  function onCapacityElementInput(evt) {
    checkRoomsToGuests(evt);
  }

  function checkRoomsToGuests(evt) {
    var element = evt.target;
    if (element.id === 'room_number') {
      countRoom = parseInt(element.value, 10);
    } else {
      countGuest = parseInt(element.value, 10);
    }
    if (countGuest > countRoom || countRoom === 100 && countGuest !== 0 || countRoom !== 100 && countGuest === 0) {
      capacityElement.setCustomValidity(wrongMessage[countRoom]);
      capacityElement.classList.add('error-form');
    } else {
      capacityElement.setCustomValidity('');
      capacityElement.classList.remove('error-form');
    }
  }

  function onTypeElementInput(evt) {
    var element = evt.target;
    priceElement.setAttribute('min', minPriceForHouse[element.value]);
    priceElement.setAttribute('placeholder', minPriceForHouse[element.value]);
    if (Number(priceElement.value) < Number(priceElement.getAttribute('min'))) {
      priceElement.classList.add('error-form');
    } else {
      priceElement.classList.remove('error-form');
    }
  }

  function onPriceElementInput() {
    if (Number(priceElement.value) < Number(priceElement.getAttribute('min'))) {
      priceElement.classList.add('error-form');
    } else {
      priceElement.classList.remove('error-form');
    }
  }

  function resetStyleValidate() {
    titleElement.classList.remove('error-form');
    roomNumberElement.classList.remove('error-form');
    capacityElement.classList.remove('error-form');
    typeElement.classList.remove('error-form');
    priceElement.classList.remove('error-form');
  }

  function onTitleInput(evt) {
    var element = evt.target;
    if (Number(element.value.length) < Number(element.getAttribute('minlength'))) {
      element.classList.add('error-form');
    } else {
      element.classList.remove('error-form');
    }
  }

  function onTimeInElementInput(evt) {
    selectById(evt);
  }

  function onTimeOutElementInput(evt) {
    selectById(evt);
  }

  function selectById(evt) {
    var id = evt.target.id;
    var select;
    if (id === 'timein') {
      select = timeOutElement;
    } else if (id === 'timeout') {
      select = timeInElement;
    }
    select.value = evt.target.value;
  }

  function onAdFormElementSumbit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adFormElement), onLoad, onError);
  }

  function onLoad() {

    window.main.switchToNoActiveModePage();

    var successElement = document.querySelector('#success').content.cloneNode(true);
    var mainElement = document.querySelector('main');
    mainElement.appendChild(successElement);
    adFormSubmitElement.blur();

    document.addEventListener('keydown', onDocumentKeyDown);
    document.addEventListener('click', onDocumentClick);

    function closeSuccessMessage() {
      document.querySelector('.success').remove();
      document.removeEventListener('keydown', onDocumentKeyDown);
      document.removeEventListener('click', onDocumentClick);
    }

    function onDocumentKeyDown(evt) {
      if (evt.key === 'Escape') {
        closeSuccessMessage();
      }
    }

    function onDocumentClick(evt) {
      if (evt.button === 0) {
        closeSuccessMessage();
      }
    }
  }

  function onError() {
    var errorElement = document.querySelector('#error').content.cloneNode(true);
    var mainElement = document.querySelector('main');
    mainElement.appendChild(errorElement);

    var errorButtonElement = document.querySelector('.error__button');
    errorButtonElement.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onDocumentKeyDown);
    document.addEventListener('click', onDocumentClick);
    errorButtonElement.focus();

    function closeErrorMessage() {
      document.querySelector('.error').remove();
      document.removeEventListener('keydown', onDocumentKeyDown);
      document.removeEventListener('click', onDocumentClick);
    }

    function onErrorButtonClick(evt) {
      if (evt.button === 0) {
        closeErrorMessage();
      }
    }

    function onDocumentKeyDown(evt) {
      if (evt.key === 'Escape') {
        closeErrorMessage();
      }
    }

    function onDocumentClick(evt) {
      if (evt.button === 0) {
        closeErrorMessage();
      }
    }
  }

  function setAddressValue(isPageActive) {
    var leftValue = parseInt(mapPinMainElement.style.left, 10);
    var topValue = parseInt(mapPinMainElement.style.top, 10);

    addressElement.value = !isPageActive ?
      (Math.round(leftValue + (WIDTH_MARK / 2))) + ' , ' + (Math.round(topValue + (WIDTH_MARK / 2))) :
      (Math.round(leftValue + (WIDTH_MARK / 2))) + ' , ' + (topValue + HEIGHT_MARK);
  }

  function onAdFormResetElementClick(evt) {
    evt.preventDefault();
    resetStyleValidate();
    window.main.switchToNoActiveModePage();
  }

  function onAdFormResetElementKeyDown(evtKey) {
    if (evtKey === 'Enter') {
      evtKey.preventDefault();
      resetStyleValidate();
      window.main.switchToNoActiveModePage();
    }
  }

  return {
    resetForm: function () {
      adFormElement.reset();
      countRoom = 1;
      countGuest = 1;
      priceElement.placeholder = 1000;
      setAddressValue(addressElementRegime.noActive);
    },

    switchFormToNoActive: function () {

      if (!adFormElement.classList.contains('ad-form--disabled')) {
        adFormElement.classList.add('ad-form--disabled');
      }

      window.util.setAttributeDisable(adFormElement.querySelectorAll('fieldset'));

      setAddressValue(addressElementRegime.noActive);

      adFormElement.removeEventListener('submit', onAdFormElementSumbit);

      adFormResetElement.removeEventListener('click', onAdFormResetElementClick);
      adFormResetElement.removeEventListener('keydown', onAdFormResetElementKeyDown);

      titleElement.removeEventListener('input', onTitleInput);
      timeInElement.removeEventListener('input', onTimeInElementInput);
      timeOutElement.removeEventListener('input', onTimeOutElementInput);
      typeElement.removeEventListener('input', onTypeElementInput);
      priceElement.removeEventListener('input', onPriceElementInput);
      roomNumberElement.removeEventListener('input', onRoomNumberElementInput);
      capacityElement.removeEventListener('input', onCapacityElementInput);
    },

    switchFormToActive: function () {
      adFormElement.classList.remove('ad-form--disabled');

      window.util.removeAttributeDisable(adFormElement.querySelectorAll('fieldset'));

      adFormResetElement.addEventListener('click', onAdFormResetElementClick);
      adFormResetElement.addEventListener('keydown', onAdFormResetElementKeyDown);

      adFormElement.addEventListener('submit', onAdFormElementSumbit);

      titleElement.addEventListener('input', onTitleInput);
      timeInElement.addEventListener('input', onTimeInElementInput);
      timeOutElement.addEventListener('input', onTimeOutElementInput);
      typeElement.addEventListener('input', onTypeElementInput);
      priceElement.addEventListener('input', onPriceElementInput);
      roomNumberElement.addEventListener('input', onRoomNumberElementInput);
      capacityElement.addEventListener('input', onCapacityElementInput);

      setAddressValue(addressElementRegime.active);
    },

    setAddressValue: setAddressValue,
  };

})();
