import { showConnectErrorMessage } from './utils.js';

const getOffersData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showConnectErrorMessage('Не удалось загрузить данные! Попробуйте перезагрузить страницу.');
    });
};

const sendFormData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => response.ok ? onSuccess() : onFail('Данные не отправлены, попробуйте еще раз'))
    .catch(() => {
      onFail('Данные не отправлены, попробуйте еще раз');
    });
};

export {getOffersData};
export {sendFormData};
