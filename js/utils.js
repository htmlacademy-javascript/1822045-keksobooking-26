const isEscapeKey = (evt) => evt.key === 'Escape';

// Сообщение об ошибке загрузки данных с сервера

const showConnectErrorMessage = (message) => {
  const connectErrorMessage = document.querySelector('#connection-error').content.querySelector('.connection-error__message');
  connectErrorMessage.textContent = message;
  document.body.append(connectErrorMessage);
};

//  Сообщение об ошибке загрузки объявления

const showFormErrorMessage = () => {
  const formErrorMessage = document.querySelector('#error').content;
  const buttonTryAgain = formErrorMessage.querySelector('.error__button');

  const removeErrorMessage = () => {
    const formErrorMessageContainer = document.querySelector('.error');
    if (formErrorMessageContainer) {
      formErrorMessageContainer.remove();
    }
  };

  buttonTryAgain.addEventListener('click', removeErrorMessage);

  document.addEventListener('keydown', () => {
    if (isEscapeKey) {
      removeErrorMessage();
    }
  });

  document.addEventListener('click', removeErrorMessage);

  document.body.append(formErrorMessage);
};

// Сообщение об успешной загрузке объявления

const formSuccessMessage = document.querySelector('#success').content.querySelector('.success');
const formSuccessMessageContainer = formSuccessMessage.cloneNode(true);

const showFormSuccessMessage = () => document.body.append(formSuccessMessageContainer);

const removeFormSuccessMessage = () => formSuccessMessageContainer.remove();

document.addEventListener('click', removeFormSuccessMessage);

document.addEventListener('keydown', () => {
  if (isEscapeKey) {
    removeFormSuccessMessage();
  }
});

// Устранение дребезга

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showConnectErrorMessage};
export {showFormErrorMessage};
export {showFormSuccessMessage};
export {debounce};
