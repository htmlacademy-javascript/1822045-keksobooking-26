import {generateArray} from './utils.js';
import {getRandomPositiveFloat} from './utils.js';
import {getRandomPositiveInteger} from './utils.js';
import {createRandomArray} from './utils.js';
import {createElement} from './utils.js';

/* eslint-disable arrow-body-style */
// const TYPE = [{palace: 'Дворец'}, 'flat: Квартира', 'house: Дом', 'bungalow: Бунгало', 'hotel: Отель'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = [' wifi', ' dishwasher', ' parking', ' washer', ' elevator', ' conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const TITLE = ['Отличный вариант для полосатых хвостов', 'Самое теплое жилище в мире', 'Супер солнечные окна', 'Дивноморским котам придется по вкусу'];
const DESCRIPTION = ['Вы не захотите от нас уезжать', 'Будете возвращаться к нам снова и снова', 'Уютные апартаменты с видом на курятник', 'В нашем доме батареи теплые даже летом'];
const [LATITUDE_INITIAL_NUMBER, LATITUDE_FINAL_NUMBER] = [35.65000, 35.70000];
const [LONGITUDE_INITIAL_NUMBER, LONGITUDE_FINAL_NUMBER] = [139.70000, 139.80000];
const RENT_OFFER_COUNT = 10;
const PRICE = generateArray(1000,50);
const ROOMS = generateArray(10, 20);
const GUESTS = generateArray(10, 100);


const TYPE = {
  flat:'Квартира',
  bungalow:'Бунгало',
  house:'Дом',
  palace:'Дворец',
  hotel:'Отель',
};

const TYPE_VALUES = Object.values(TYPE);

const createAvatarAddress = (length) => {
  const randomNumber = getRandomPositiveInteger(1, length);

  return(
    (randomNumber < length) ?
      `img/avatars/user0${randomNumber}.png` :
      `img/avatars/user${randomNumber}.png`
  );
};

const rentOffer = () => {
  const latitude = getRandomPositiveFloat(LATITUDE_INITIAL_NUMBER, LATITUDE_FINAL_NUMBER);
  const longitude = getRandomPositiveFloat(LONGITUDE_INITIAL_NUMBER, LONGITUDE_FINAL_NUMBER);

  return ({
    autor:
      {avatar: createAvatarAddress(10)},
    offer: {
      title: createElement(TITLE),
      address: `${latitude}, ${longitude},`,
      price: createElement(PRICE),
      type: createElement(TYPE_VALUES),
      rooms: createElement(ROOMS),
      guests: createElement(GUESTS),
      checkin: createElement(TIMES),
      checkout: createElement(TIMES),
      features: createRandomArray(FEATURES),
      description: createElement(DESCRIPTION),
      photos: createRandomArray(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  });
};

const createOffers = () => Array.from({length: RENT_OFFER_COUNT},  rentOffer);
// createOffers.join();

export {createOffers};


