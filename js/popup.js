import {createOffers} from './data.js';

const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarCardList = document.querySelector('#map-canvas');
const similarCards = createOffers();
const offerListFragment = document.createDocumentFragment();
const CURRENCY = ' ₽/ночь';
const ROOMS_FOR = ' комнаты для ';
const PEOPLE = ' гостей';
const CHECKIN_TEXT = 'Заезд после ';
const CHECKOUT_TEXT = ' выезд после ';

similarCards.forEach((card) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + CURRENCY;
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ROOMS_FOR + card.offer.guests + PEOPLE;
  cardElement.querySelector('.popup__text--time').textContent =  CHECKIN_TEXT + card.offer.checkin + CHECKOUT_TEXT + card.offer.checkout;
  cardElement.querySelector('.popup__feature').content = card.offer.features[0];
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.autor.avatar;
  cardElement.querySelector('.popup__photo').src = card.offer.photos[0];
  const photoElement = cardElement.querySelector('.popup__photo');

  if (card.offer.photos.length > 1) {
    const photoList = cardElement.querySelector('.popup__photos');
    const photosFragment = document.createDocumentFragment();
    const photoElementCopy = cardElement.querySelector('.popup__photo');
    photoElement.remove('popup__photo');

    for (let i=1; i < card.offer.photos.length; i++) {
      const photoElementCopy2 = photoElementCopy.cloneNode(true);
      photoElementCopy2.src = card.offer.photos[i];
      photosFragment.append(photoElementCopy2);
    }
    photoList.append(photosFragment);
  }

  if (card.offer.features.length > 1) {
    const featuresList = cardElement.querySelector('.popup__features');
    const featureElement = cardElement.querySelector('.popup__feature');
    const featuresFragment = document.createDocumentFragment();
    featuresList.textContent = '';


    for (let i=1; i < card.offer.features.length; i++) {
      const featureElementCopy = featureElement.cloneNode(true);
      featureElementCopy.className = '';
      const classType = 'popup__feature--';
      featureElementCopy.classList.add('popup__feature', classType + card.offer.features[i]);
      featuresFragment.append(featureElementCopy);
    }
    featuresList.append(featuresFragment);
  }

  if (card.offer.title === '') {
    cardElement.querySelector('.popup__title').classList.add('hidden');
  }

  if (card.offer.type === '') {
    cardElement.querySelector('.popup__type').classList.add('hidden');
  }

  if (card.offer.rooms === '') {
    cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (card.offer.checkin === '') {
    cardElement.querySelector('.popup__time').classList.add('hidden');
  }

  if (card.offer.checkout === '') {
    cardElement.querySelector('.popup__time').classList.add('hidden');
  }

  if (card.offer.features === '') {
    cardElement.querySelector('.popup__features').classList.add('hidden');
  }

  if (card.offer.description === '') {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }

  if (card.offer.avatar === '') {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  if (card.offer.photo === '') {
    cardElement.querySelector('.popup__photo').classList.add('hidden');
  }

  offerListFragment.appendChild(cardElement);

});

similarCardList.append(offerListFragment);

export {similarCards};
