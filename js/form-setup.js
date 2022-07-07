const form = document.querySelector('.ad-form');
const typeElement = form.querySelector('#type');
const priceElement = form.querySelector('#price');
const roomNumberElement = form.querySelector('#room_number');
const capacityElement = form.querySelector('#capacity');
const addFormElements = form.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('select', 'fieldset');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const TYPE_ELEMENTS_MINCOST_LIST = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const CAPACITY_OPTION = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error--text',
});

const getFormDisabled = () => {
  form.classList.add('ad-form--disabled');
  addFormElements.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'true');
  });

  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersFormElements.forEach((element) => {
    element.setAttribute('disabled', 'true');
  });
};

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  'Обязательное поле от 30 до 100 символов');

typeElement.addEventListener('change', () => {
  const typeSelectedElement = typeElement.querySelector('option:checked');
  priceElement.placeholder = TYPE_ELEMENTS_MINCOST_LIST[typeSelectedElement.value];
});

const validatePrice =  () => {
  const typeSelectedElement = typeElement.querySelector('option:checked');
  return priceElement.value >= TYPE_ELEMENTS_MINCOST_LIST[typeSelectedElement.value];
};

const getValidatePriceErrorMessage = () => {
  const typeSelectedElement = typeElement.querySelector('option:checked');
  return `Минимальная стоимость за выбранный тип проживания от ${TYPE_ELEMENTS_MINCOST_LIST[typeSelectedElement.value]}`;
};

pristine.addValidator(
  form.querySelector('#price'),
  validatePrice,
  getValidatePriceErrorMessage);

const validateCapacity = () => CAPACITY_OPTION[roomNumberElement.value].includes(capacityElement.value);

pristine.addValidator(
  form.querySelector('#room_number'),
  validateCapacity,
  'Сюда столько гостей не поместится');

pristine.addValidator(
  form.querySelector('#capacity'),
  validateCapacity);

form.addEventListener('change', (evt) => {
  if (evt.target.matches('#timein', '#timeout')) {
    form.timein.value = evt.target.value;
    form.timeout.value = evt.target.value;
  }
});

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

