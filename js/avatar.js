const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.ad-form__field input[type="file"]');
const preview = document.querySelector('.ad-form-header__preview img');
const previewPlaceholder = document.querySelector('.ad-form-header__preview img').src;
const filePhotosChooser = document.querySelector('.ad-form__upload input[type="file"]');
const previewPhotoContainer = document.querySelector('.ad-form__photo');
const previewPhoto = document.createElement('img');
previewPhotoContainer.append(previewPhoto);

previewPhoto.width = 70;
previewPhoto.height = 70;

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

filePhotosChooser.addEventListener('change', () => {
  const file = filePhotosChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPhoto.src = URL.createObjectURL(file);
  }
});

const getPhotosCleared = () => {
  preview.src = previewPlaceholder;
  previewPhoto.src = '';
};

export {getPhotosCleared};
