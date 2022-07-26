import { getFormDisabled } from './form-setup.js';
import { getFormUnabled } from './form-setup.js';
import {addressElement} from './form-setup.js';
import { renderSimilarCardsList } from './popup.js';
import { getOffersData } from './server-connection.js';

const [MAIN_LAT, MAIN_LNG] = [35.68951, 139.69171];
const MAP_ZOOM = 13;
addressElement.value = `${MAIN_LAT}, ${MAIN_LNG}`;
const OFFERS_LIMIT = 10;
let offersFragment;

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const map = L.map('map-canvas', getFormDisabled)
  .on('load', () =>
    getFormUnabled(),
  getOffersData((offers) => {
    const OffersList = offers.slice(0, OFFERS_LIMIT);
    getOffersPoints(OffersList);
  })
  )
  .setView({
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },)
  .addTo(map);

const mainMarker = L.marker(
  {
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const setMapInitPosition = () => {
  mainMarker.setLatLng({
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  });

  map.setView({
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  }, 13);

  // const {lat, lng} = mainMarker.getLatLng();
  addressElement.value = `${MAIN_LAT}, ${MAIN_LNG}`;
};

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressElement.value =`${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

const markerLayer = L.layerGroup().addTo(map);
let offersLayer = L.layerGroup().addTo(map);

const clearLayer = () => {
  map.removeLayer(offersLayer);
  offersLayer = L.layerGroup().addTo(map);
};

const createOffersMarker = (pointsData, index) => {
  const {location} = pointsData;
  const offersMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: icon,
    }
  );
  offersMarker
    .addTo(offersLayer)
    .bindPopup(offersFragment.children[index]);
};

function getOffersPoints(offers) {
  offersFragment = renderSimilarCardsList(offers);
  clearLayer();
  offers.forEach((pointsData, index) => {
    createOffersMarker(pointsData, index);
  });
}

mainMarker.addTo(markerLayer);

export {getOffersPoints};
export {setMapInitPosition};
