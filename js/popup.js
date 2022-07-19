import {map} from './map-setup.js';
import {icon} from './map-setup.js';

const DEFAULT = {type: 'flat'};
const OFFERS_COUNT = 10;
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarCardList = document.querySelector('#card');
const CURRENCY = ' ₽/ночь';
const ROOMS_FOR = ' комнаты для ';
const PEOPLE = ' гостей';
const CHECKIN_TEXT = 'Заезд после ';
const CHECKOUT_TEXT = ' выезд после ';
const mapFiltersFormElement = document.querySelector('.map__filters');
// const priceOptions = {
//   any: [0],
//   middle: [10000, 50000],
//   low: [10000],
//   high: [50000]
// };

const getOfferRank = (offer) => {
  const housingTypeElement = document.querySelector('[name="housing-type"]');
  const housingTypeSelectedElement = housingTypeElement.querySelector('option:checked');
  // const priceElement = document.querySelector('[name="housing-price"]');
  // const priceSelectedElement = priceElement.querySelector('option:checked');

  let rank = 0;

  if (offer.offer.type === (housingTypeSelectedElement.value || DEFAULT.type)) {
    rank += 2;
  }

  return rank;
};

// Функция сортировки

const compareOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);

  return rankB - rankA;
};

const setMapFilters = (cb) => {
  mapFiltersFormElement.addEventListener('change', () => {
    cb();
  });
};


const renderSimilarCardsList = (similarCards) => {
  const offerListFragment = document.createDocumentFragment();
  similarCards
    .slice()
    .sort(compareOffers)
    .slice(0, OFFERS_COUNT)
    .forEach((card) => {
      const cardElement = similarCardTemplate.cloneNode(true);
      cardElement.querySelector('.popup__title').textContent = card.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = card.offer.price + CURRENCY;
      cardElement.querySelector('.popup__type').textContent = card.offer.type;
      cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ROOMS_FOR + card.offer.guests + PEOPLE;
      cardElement.querySelector('.popup__text--time').textContent =  CHECKIN_TEXT + card.offer.checkin + CHECKOUT_TEXT + card.offer.checkout;
      cardElement.querySelector('.popup__description').textContent = card.offer.description;
      cardElement.querySelector('.popup__avatar').src = card.author.avatar;

      const photoElementContainer = cardElement.querySelector('.popup__photo');

      if (card.offer.photos) {
        cardElement.querySelector('.popup__photo').src = card.offer.photos[0];

        if (card.offer.photos.length > 0) {
          const photoList = cardElement.querySelector('.popup__photos');
          const photosFragment = document.createDocumentFragment();
          const photoElement = cardElement.querySelector('.popup__photo');
          photoElementContainer.remove('popup__photo');

          for (let i=1; i < card.offer.photos.length; i++) {
            const photoElementCopy = photoElement.cloneNode(true);
            photoElementCopy.src = card.offer.photos[i];
            photosFragment.append(photoElementCopy);
          }
          photoList.append(photosFragment);
        }
      }

      if (card.offer.features) {
        cardElement.querySelector('.popup__feature').content = card.offer.features[0];

        if (card.offer.features.length > 0) {
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

  similarCardList.innerHTML = '';
  similarCardList.append(offerListFragment);

  // Добавляем маркеры с объявлениями на карту
  const cardPopupElements = document.querySelectorAll('.popup');
  cardPopupElements.textContent = similarCards[0];

  const markerGroup = L.layerGroup().addTo(map);

  const createMarkers = (lat, lng, index) => {
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(cardPopupElements[index]);
  };

  markerGroup.clearLayers();
  similarCards.slice(0, 10).forEach((element, index) => {
    createMarkers(element.location.lat, element.location.lng, index);
  });
};

export {renderSimilarCardsList};
export {setMapFilters};
