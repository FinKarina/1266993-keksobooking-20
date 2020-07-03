'use strict';
var COUNTER = 8;
var types = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var rooms = [1, 2, 3, 100];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var guests = [1, 2, 3, 'не для гостей'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var mapPinMain = document.querySelector('.map__pin--main');
var fieldsetAll = document.querySelectorAll('fieldset');

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

var mapPins = document.querySelector('.map__pins');

function generateOffer() {
  return {
    author: {
      avatar: 'img/avatars/user0' + randomInteger(1, 8) + '.png'
    },
    offer: {
      title: 'заголовок',
      address: Object.assign({}, location),
      price: '20',
      type: 'house',
      rooms: rooms[randomInteger(0, rooms.length)],
      guests: guests[randomInteger(0, guests.length)],
      checkin: checkin[randomInteger(0, checkin.length)],
      checkout: checkout[randomInteger(0, checkout.length)],
      features: features[randomInteger(0, features.length)],
      description: 'описание',
      photos: photos[randomInteger(0, photos.length)]
    },
    location: {
      x: randomInteger(0, mapPins.offsetWidth),
      y: randomInteger(130, 630)
    }
  };
}

var templatePin = document.querySelector('#pin')
.content
.querySelector('button');

var createPin = function () {
  var offer = generateOffer();
  var pin = templatePin.cloneNode(true);
  pin.style.left = offer.location.x - (PIN_WIDTH / 2) + 'px';
  pin.style.top = offer.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = offer.author.avatar;
  return pin;
};

var pinsFragment = document.createDocumentFragment();
for (var i = 0; i < COUNTER; i++) {
  pinsFragment.appendChild(createPin());
}

mapPins.appendChild(pinsFragment);

for (var k = 0; k < fieldsetAll.length; k++) {
  fieldsetAll[k].disabled = true;
}
/*
mapPinMain.onclick = function () {
  activatesSite();
};*/


mapPinMain.addEventListener('click', function () {
  activatesSite();
});


mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatesSite();
  }
});

var classRemove = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
};

var mapPinAdress = function () {
  var offer = generateOffer();
  var address = document.querySelector('#address');
  address.setAttribute('value', offer.location.x + ', ' + offer.location.y);
};

var activatesSite = function () {
  classRemove();
  mapPinAdress();
  for (var l = 0; l < fieldsetAll.length; l++) {
    fieldsetAll[l].disabled = false;
  }
};

var roomsNumber = document.querySelector('#room_number');
var guestsNumber = document.querySelector('#capacity');

var handlerValidateRoomsQuests = function () {
  roomsNumber.setCustomValidity('');
  guestsNumber.setCustomValidity('');
  if (roomsNumber.value === '1' && guestsNumber.value !== '1') {

    roomsNumber.setCustomValidity(guestsNumber.options[2].text);
  } else if (roomsNumber.value === '2' && guestsNumber.value !== '2' && guestsNumber.value !== '1') {
    roomsNumber.setCustomValidity(guestsNumber.options[1].text + '/' + guestsNumber.options[2].text);
  } else if (roomsNumber.value === '3' && guestsNumber.value !== '3' && guestsNumber.value !== '2' && guestsNumber.value !== '1') {
    roomsNumber.setCustomValidity(guestsNumber.options[0].text + '/' + guestsNumber.options[1].text + '/' + guestsNumber.options[2].text);
  } else if (roomsNumber.value === '100' && guestsNumber.value !== '0') {
    roomsNumber.setCustomValidity(guestsNumber.options[3].text);
  } else {
    roomsNumber.setCustomValidity('');
  }
};

roomsNumber.addEventListener('change', handlerValidateRoomsQuests);
guestsNumber.addEventListener('change', handlerValidateRoomsQuests);
