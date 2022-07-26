import { showFormErrorMessage, showFormSuccessMessage } from './utils.js';
import { setMapInitPosition } from './map-setup.js';
import { getPhotosCleared } from './avatar.js';
import { sendFormData } from './server-connection.js';
import { setFilter } from './filters-setup.js';

const form = document.querySelector('.ad-form');
const submitButton = form.querySelector('.ad-form__submit');
const typeElement = form.querySelector('#type');
const priceElement = form.querySelector('#price');
const roomNumberElement = form.querySelector('#room_number');
const capacityElement = form.querySelector('#capacity');
const addFormElements = form.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('select', 'fieldset');
const addressElement = form.querySelector('#address');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const sliderElement = document.querySelector('.ad-form__slider');


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

// Формы активации - деактивации
const getFormDisabled = () => {
  form.classList.add('ad-form--disabled');
  addFormElements.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'true');
  });

  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersFormElements.forEach((element) => {
    element.setAttribute('disabled', 'true');
  });

  sliderElement.setAttribute('disabled', true);
};

const getFormUnabled = () => {
  form.classList.remove('ad-form--disabled');
  addFormElements.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });

  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  sliderElement.removeAttribute('disabled');

};

// Слайдер

noUiSlider.create(sliderElement, {
  range: {
    min: TYPE_ELEMENTS_MINCOST_LIST[typeElement.value],
    max: 100000,
  },
  start: TYPE_ELEMENTS_MINCOST_LIST[typeElement.value],
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

typeElement.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: TYPE_ELEMENTS_MINCOST_LIST[typeElement.value],
      max: 100000,
    },
  });
  sliderElement.noUiSlider.set(TYPE_ELEMENTS_MINCOST_LIST[typeElement.value]);
});

priceElement.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceElement.value);
});

const resetSliderElement = () => {
  sliderElement.noUiSlider.set(TYPE_ELEMENTS_MINCOST_LIST[typeElement.value]);
};

//  Валидация

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
  priceElement.placeholder = TYPE_ELEMENTS_MINCOST_LIST[typeElement.value];
});

const validatePrice =  () => priceElement.value >= TYPE_ELEMENTS_MINCOST_LIST[typeElement.value];

const getValidatePriceErrorMessage = () => `Минимальная стоимость за выбранный тип проживания от ${TYPE_ELEMENTS_MINCOST_LIST[typeElement.value]}`;

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

// Блокировка и разблокировка кнопки отправки

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};


// Форма отправки объявления

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendFormData(
      () => {
        showFormSuccessMessage();
        mapFiltersForm.reset();
        form.reset();
        unblockSubmitButton();
        getPhotosCleared();
        setMapInitPosition();
      },
      () =>  {
        showFormErrorMessage();
        unblockSubmitButton();
      },
      formData,
    );
  }
});

form.addEventListener('reset', ()=> {
  getPhotosCleared();
  mapFiltersForm.reset();
  resetSliderElement();
  setTimeout(() => {
    setMapInitPosition();
    setFilter();
  });
});

export {getFormDisabled};
export {getFormUnabled};
export {addressElement};
