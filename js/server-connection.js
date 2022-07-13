import {renderSimilarCardsList} from './popup.js';

fetch('https://26.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offers) => {
    console.log(offers);
    renderSimilarCardsList(offers);
  });
