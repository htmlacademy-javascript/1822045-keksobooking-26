import {getOffersData} from './server-connection.js';
import {getOffersPoints} from './map-setup.js';
import {debounce} from './utils.js';

const OFFERS_LIMIT = 10;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const RERENDER_TIMEOUT = 500;

const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeField = mapFiltersForm.querySelector('#housing-type');
const housingRoomsField = mapFiltersForm.querySelector('#housing-rooms');
const housingGuestsField = mapFiltersForm.querySelector('#housing-guests');
const housingPriceField = mapFiltersForm.querySelector('#housing-price');
const housingFeaturesField = mapFiltersForm.querySelector('#housing-features');

const filterOffersType = (offers) => housingTypeField.value !== 'any' ? offers.offer.type === housingTypeField.value : true;

const filterOffersRooms = (offers) => housingRoomsField.value !== 'any' ? offers.offer.rooms === +housingRoomsField.value : true;

const filterOffersGuests = (offers) => housingGuestsField.value !== 'any' ? offers.offer.guests === +housingGuestsField.value : true;

const filterOffersPrice = (offers) => {
  const offerPrice = () => {
    if (offers.offer.price < LOW_PRICE) {
      return 'low';
    } else {
      if (offers.offer.price > HIGH_PRICE) {
        return 'high';
      } else {
        return 'middle';
      }
    }
  };
  return housingPriceField.value !== 'any' ? offerPrice() === housingPriceField.value : true;
};

const filterOffersFeatures = (offers) => {
  const checkedFeatures = Array.from(housingFeaturesField.querySelectorAll(':checked')).map((inputElement) => inputElement.value);
  let test = false;
  if (checkedFeatures.length > 0) {
    if (offers.offer.features) {
      for (let i = 0; i < offers.offer.features.length; i++) {
        if (checkedFeatures.some((checkedFeature) => checkedFeature === offers.offer.features[i])) {
          test = true;
        }
      }
    }
  } else {
    test = true;
  }
  return test;
};

const getOffersFeaturesRank = (offers) => {
  const checkedFeatures = Array.from(housingFeaturesField.querySelectorAll(':checked')).map((inputElement) => inputElement.value);
  let rank = 0;
  if (offers.offer.features) {
    offers.offer.features.forEach((offerFeature) => {
      if (checkedFeatures.some((checkedFeature) => checkedFeature === offerFeature)) {
        rank++;
      }
    });
  }
  return rank;
};

const compareOffersFeatures = (offerA, offerB) =>{
  const rankA = getOffersFeaturesRank(offerA);
  const rankB = getOffersFeaturesRank(offerB);

  return rankB - rankA;
};


const setFilter = () =>{
  getOffersData((offers) => {
    const offersList = offers
      .filter(filterOffersType)
      .filter(filterOffersRooms)
      .filter(filterOffersGuests)
      .filter(filterOffersPrice)
      .filter(filterOffersFeatures)
      .slice()
      .sort(compareOffersFeatures)
      .slice(0, OFFERS_LIMIT);
    getOffersPoints(offersList);
  });
};

mapFiltersForm.addEventListener('change', debounce(setFilter, RERENDER_TIMEOUT));

export {setFilter};
