const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'ad-form__element--invalid', // Класс, обозначающий невалидное поле
  successClass: 'ad-form__element--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'ad-form__error--text' // Класс для элемента с текстом ошибки
});

function validateTitle(value) {
  return value.length >= 30 && value.length <= 100;
}


pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  'Обязательное поле от 30 до 100 символов');

const TYPE_ELEMENTS_MINCOST_LIST = {
  bungalow: 0,
  flat: 2000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const typeElement = form.querySelector('#type');
const priceElement = form.querySelector('#price');

typeElement.addEventListener('change', () => {
  const typeSelectedElement = typeElement.querySelector('option:checked');
  priceElement.placeholder = TYPE_ELEMENTS_MINCOST_LIST[typeSelectedElement.value];
});


function validatePrice () {
  const typeSelectedElement = typeElement.querySelector('option:checked');
  return priceElement.value >= TYPE_ELEMENTS_MINCOST_LIST[typeSelectedElement.value];
}

function getValidatePriceErrorMessage () {
  const typeSelectedElement = typeElement.querySelector('option:checked');
  return `Минимальная стоимость за выбранный тип проживания от ${TYPE_ELEMENTS_MINCOST_LIST[typeSelectedElement.value]}`;
}

pristine.addValidator(
  form.querySelector('#price'),
  validatePrice,
  getValidatePriceErrorMessage);

const roomNumberElement = form.querySelector('#room_number');
const capacityElement = form.querySelector('#capacity');
const capacityOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

function validateCapacity () {
  return capacityOption[roomNumberElement.value].includes(capacityElement.value);
}

pristine.addValidator(
  form.querySelector('#room_number'),
  validateCapacity,
  'столько не поместится');

pristine.addValidator(
  form.querySelector('#capacity'),
  validateCapacity);


form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
