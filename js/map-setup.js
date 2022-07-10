import { getFormDisabled } from './form-setup.js';
import { getFormUnabled } from './form-setup.js';
import {addressElement} from './form-setup.js';
import { similarCards } from './popup.js';

const [MAIN_LAT, MAIN_LNG] = [35.68950, 139.69171];
const MAP_ZOOM = 13;

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
  .on('load', getFormUnabled)
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
    lat:35.68950,
    lng:139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressElement.value =`Координаты широта ${lat.toFixed(5)} и долгота ${lng.toFixed(5)}`;
});

const сardPopupElements = document.querySelectorAll('.popup');
сardPopupElements.textContent = similarCards[0];

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
    .addTo(map)
    .bindPopup(сardPopupElements[index]);
};

similarCards.slice(0, 10).forEach((element, index) => {
  createMarkers(element.location.lat, element.location.lng, index);
});

