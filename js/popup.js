import {createOffers} from './data.js';

const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarCardList = document.querySelector('#map-canvas');

const similarCards = createOffers();
const offerListFragment = document.createDocumentFragment();
const CURRENCY = ' ₽/ночь';
const ROOMS_FOR = ' комнаты для ';
const PEOPLE = ' гостей';
const CHECKIN_TEXT = 'Заезд после ';
const CHECKOUT_TEXT = ' выезд после';


similarCards.forEach((card) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + CURRENCY;
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ROOMS_FOR + card.offer.guests + PEOPLE;
  cardElement.querySelector('.popup__text--time').textContent =  CHECKIN_TEXT + card.offer.checkin + CHECKOUT_TEXT + card.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.autor.avatar;
  cardElement.querySelector('.popup__photos').src = card.offer.photos[0];

  if (card.offer.photos.length > 1) {
    const photoList = cardElement.querySelector('.popup__photos');
    const photosFragment = document.createDocumentFragment();

    for (let i=0; i < card.offer.photos.length; i++) {
      const photoElement = cardElement.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = card.offer.photos[i];
      photosFragment.append(photoElement);
    }
    photoList.append(photosFragment);
  }

  const emptyPhotoTemplate = cardElement.querySelector('.popup__photo');

  if (emptyPhotoTemplate.src==='') {
    cardElement.querySelector('.popup__photo').classList.add('hidden');
  }

  const descriptionText = cardElement.querySelector('.popup__description');
  if ( descriptionText === '') {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }

  offerListFragment.appendChild(cardElement);
});

similarCardList.append(offerListFragment);
