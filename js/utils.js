const isEscapeKey = (evt) => evt.key === 'Escape';

const generateArray = (length, max) => (
  [...new Array(length)]
    .map(() => Math.round(Math.random() * max))
);

const checkPositiveArray = (initialNumber, finalNumber) => (initialNumber < 0 || finalNumber < 0) ? 0 : 1;

const swapValues = (initialNumber, finalNumber) => {
  if (finalNumber < initialNumber) {
    finalNumber = [initialNumber, initialNumber = finalNumber][0];
  }

  return [initialNumber, finalNumber];
};

const getRandomPositiveInteger = (initialNumber, finalNumber) => {
  if (checkPositiveArray(initialNumber, finalNumber) === 0) {
    return;
  }

  [initialNumber, finalNumber] = swapValues(initialNumber, finalNumber);

  initialNumber = Math.ceil(initialNumber);
  finalNumber = Math.floor(finalNumber);

  return Math.floor(Math.random() * (finalNumber - initialNumber + 1)) + initialNumber;
};

const getRandomPositiveFloat = (initialNumber, finalNumber, presicion = 5) => {
  if (checkPositiveArray(initialNumber, finalNumber) === 0) {
    return;
  }

  [initialNumber, finalNumber] = swapValues(initialNumber, finalNumber);

  return (Math.random() * (finalNumber - initialNumber) + initialNumber).toFixed(presicion);
};

const createElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createRandomArray = (elements) => {
  const lengthArray = getRandomPositiveInteger(1, elements.length);
  const newArray = [];
  do {
    const newElement = createElement(elements);
    if (!(newArray.includes(newElement))) {
      newArray.push(newElement);
    }
  } while (newArray.length < lengthArray);
  return newArray;
};

const showConnectErrorMessage = (message) => {
  const connectErrorMessage = document.querySelector('#connection-error').content.querySelector('.connection-error__message');
  connectErrorMessage.textContent = message;
  document.body.append(connectErrorMessage);
};

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

const showFormSuccessMessage = () => {
  const formSuccessMessage = document.querySelector('#success').content;

  document.addEventListener('keydown', () => {
    if (isEscapeKey) {
      const formSuccessMessageContainer = document.querySelector('.success');
      formSuccessMessageContainer.remove('success');
    }
  });

  document.addEventListener('click', () => {
    const formSuccessMessageContainer = document.querySelector('.success');
    formSuccessMessageContainer.remove('success');
  });

  document.body.append(formSuccessMessage);
};

export {generateArray};
export {getRandomPositiveFloat};
export {getRandomPositiveInteger};
export {createRandomArray};
export {createElement};
export {showConnectErrorMessage};
export {showFormErrorMessage};
export {showFormSuccessMessage};

