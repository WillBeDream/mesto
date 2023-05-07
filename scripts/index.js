import initialCards from "../utils/cards.js";
import enableValidationConfig from "../utils/constants.js";
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import {openPopup, closePopup } from "../utils/utils.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";

const buttonEditProfile = document.querySelector(".profile__edit-button"); //editBtn
const popupEdit = document.querySelector(".popup-edit");
const popupAdd = document.querySelector(".popup-add");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const textEditTitle = document.querySelector("#title"); //editMenuTitle
const textEditDescription = document.querySelector("#description"); //editMenuDescription
const profileEditForm = document.forms["edit-form"]; //saveForm
const profileAddBtn = document.querySelector(".profile__add-button"); //addBtn
const cardAddForm = document.forms["add-form"]; //addElem
const popupImage = document.querySelector(".popup_show-image");
const title = document.querySelector("#add-title");
const link = document.querySelector("#add-description");
const cardsContainer = document.querySelector(".elements");
const popups = document.querySelectorAll(".popup");
const addFormValidator = new FormValidator(cardAddForm, enableValidationConfig);
const editFormValidator = new FormValidator(
  profileEditForm,
  enableValidationConfig
);

const popupAddObj = new Popup('.popup-add');
popupAddObj.setEventListeners();
const popupEidtObj = new Popup('.popup-edit');
popupEidtObj.setEventListeners();
const popupImageObj = new PopupWithImage(".popup_show-image");

function openEditPopup() {
  openPopup(popupEdit);
  textEditTitle.value = profileTitle.textContent;
  textEditDescription.value = profileDescription.textContent;
}

function openAddPopup() {
  openPopup(popupAdd);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = textEditTitle.value;
  profileDescription.textContent = textEditDescription.value;
  closePopup(popupEdit);
}

function addCard(cardData) {
  const card = new Card(cardData, "#element-template", popupImage);
  const cardElement = card.createCard();
  cardsContainer.prepend(cardElement);
}

cardAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const card = { name: title.value, link: link.value };
  addCard(card);
  closePopup(popupAdd);
  cardAddForm.reset();
  addFormValidator.toggleButtonState();
});

/*
initialCards.forEach(function (card) {
  addCard(card);
});*/

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#element-template", popupImage);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    }
  }, '.elements');

cardList.renderItems();

profileAddBtn.addEventListener("click", ()=> {
  popupAddObj.open();
});
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
buttonEditProfile.addEventListener("click", ()=> {
  popupEidtObj.open();
});

/*
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});*/

editFormValidator.enableValidation();
addFormValidator.enableValidation();
