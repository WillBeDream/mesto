const enableValidationConfig = {
  formSelector: ".popup__set",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup__error_visible",
};

const dataProfile = {
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  profileSelector: '.profile__avatar',
};

const buttonEditProfile = document.querySelector(".profile__edit-button"); //editBtn
const profileEditForm = document.forms["edit-form"]; //saveForm
const profileAddBtn = document.querySelector(".profile__add-button"); //addBtn
const cardAddForm = document.forms["add-form"]; //addElem
const profileAvatar = document.querySelector('.profile__avatar-edit');
const avatarForm = document.forms['avatar-form'];

export {
  enableValidationConfig,
  dataProfile,
  buttonEditProfile,
  profileEditForm,
  profileAddBtn,
  cardAddForm,
  profileAvatar,
  avatarForm,
};
