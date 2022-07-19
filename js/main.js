import './data.js';
import './utils.js';
import './popup.js';
import './form-setup.js';
import './map-setup.js';
import './server-connection.js';
import { offerFormSubmit } from './form-setup.js';
import {getData} from './server-connection.js';
import {renderSimilarCardsList} from './popup.js';
import {setMapFilters} from './popup.js';


offerFormSubmit();

getData((offers) => {
  renderSimilarCardsList(offers);
  setMapFilters(() => renderSimilarCardsList(offers));
  console.log(offers)
});

