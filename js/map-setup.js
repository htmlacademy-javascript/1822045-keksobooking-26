import { getFormDisabled } from './form-setup.js';
import { getFormUnabled } from './form-setup.js';
import {addressElement} from './form-setup.js';

const [MAIN_LAT, MAIN_LNG] = [35.68950, 139.69171];
const MAP_ZOOM = 13;
addressElement.value = `${MAIN_LAT}, ${MAIN_LNG}`;

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
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressElement.value =`${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

export {map};
export {icon};
