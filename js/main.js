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

var createPin = function() {
  var offer = generateOffer();
  var pin = templatePin.cloneNode(true);
  pin.style.left = offer.location.x - (PIN_WIDTH / 2) + 'px';
  pin.style.top = offer.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = offer.author.avatar;
  return pin;
}

var pinsFragment = document.createDocumentFragment();
for (var i = 0; i < COUNTER; i++) {
  pinsFragment.appendChild(createPin());
}

mapPins.appendChild(pinsFragment);

var map = document.querySelector('.map');
map.classList.remove('map--faded');
