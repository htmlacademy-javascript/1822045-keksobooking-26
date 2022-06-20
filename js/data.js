import {generateArray} from './utils.js';
import {getRandomPositiveFloat} from './utils.js';
import {getRandomPositiveInteger} from './utils.js';
import {createRandomArray} from './utils.js';
import {createElement} from './utils.js';

/* eslint-disable arrow-body-style */
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const [LATITUDE_INITIAL_NUMBER, LATITUDE_FINAL_NUMBER] = [35.65000, 35.70000];
const [LONGITUDE_INITIAL_NUMBER, LONGITUDE_FINAL_NUMBER] = [139.70000, 139.80000];
const RENT_OFFER_COUNT = 10;
const PRICE = generateArray(1000,50);
const ROOMS = generateArray(1000, 100);
const GUESTS = generateArray(1000, 1000);

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
      title: 'Отличный вариант для полосатых хвостов',
      address: `${latitude}, ${longitude},`,
      price: createElement(PRICE),
      type: createElement(TYPE),
      rooms: createElement(ROOMS),
      guests: createElement(GUESTS),
      checkin: createElement(TIMES),
      checkout: createElement(TIMES),
      features: createRandomArray(FEATURES),
      description: 'вы не захотите нас покидать',
      photos: createRandomArray(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  });
};

const offers = Array.from({length: RENT_OFFER_COUNT},  rentOffer);
offers.join();
