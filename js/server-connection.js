import { showConnectErrorMessage } from './utils.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showConnectErrorMessage('Не удалось загрузить данные! Попробуйте перезагрузить страницу.');
    });
};


export {getData};
