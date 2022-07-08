const form = document.querySelector('.ad-form');
const typeElement = form.querySelector('#type');
const typeSelectedElement = typeElement.querySelector('option:checked');
const priceElement = form.querySelector('#price');
const roomNumberElement = form.querySelector('#room_number');
const capacityElement = form.querySelector('#capacity');
const addFormElements = form.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('select', 'fieldset');
const addressElement = form.querySelector('#address');
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

const getFormUnabled = () => {
  form.classList.remove('ad-form--disabled');
  addFormElements.forEach((fieldset) => {
    fieldset.removeAttribute('disabled', 'true');
  });

  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersFormElements.forEach((element) => {
    element.removeAttribute('disabled', 'true');
  });
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error--text',
});

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  'Обязательное поле от 30 до 100 символов');

typeElement.addEventListener('change', () => {
  priceElement.placeholder = TYPE_ELEMENTS_MINCOST_LIST[typeSelectedElement.value];
});

const validatePrice =  () => priceElement.value >= TYPE_ELEMENTS_MINCOST_LIST[typeSelectedElement.value];

const getValidatePriceErrorMessage = () => {
  typeSelectedElement = typeElement.querySelector('option:checked');
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

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

typeElement.addEventListener('change', (evt) => {

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: TYPE_ELEMENTS_MINCOST_LIST[typeSelectedElement.value],
      max: 100000,
    },
  });
  sliderElement.noUiSlider.set(TYPE_ELEMENTS_MINCOST_LIST[typeSelectedElement.value]);
});

priceElement.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.set(priceElement.value);
});

export {getFormDisabled};
export {getFormUnabled};
export {addressElement};
