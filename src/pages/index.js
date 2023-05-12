import "./index.css";
import initialCards from "../utils/cards.js";
import {
  enableValidationConfig,
  dataProfile,
  buttonEditProfile,
  profileEditForm,
  profileAddBtn,
  cardAddForm,
} from "../utils/constants.js";
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const addFormValidator = new FormValidator(cardAddForm, enableValidationConfig);
const editFormValidator = new FormValidator(
  profileEditForm,
  enableValidationConfig
);

const createCard = (item) => {
  const card = new Card(item, "#element-template", popupImageObj.open);
  const cardElement = card.createCard();
  return cardElement;
}

const popupImageObj = new PopupWithImage(".popup_show-image");
popupImageObj.setEventListeners();
const user = new UserInfo(dataProfile);
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardCreated = createCard(item);
      cardList.addItem(cardCreated);
    },
  },
  ".elements"
);

cardList.renderItems();

const popupAddObj = new PopupWithForm('.popup-add', (evt) => {
  evt.preventDefault();
  const dataForm = popupAddObj.getInputValues();
  const data = {name: dataForm['add-title'], link: dataForm['add-description']};
  const cardCreated = createCard(data);
  cardList.addItem(cardCreated);
  popupAddObj.close();
} );
popupAddObj.setEventListeners();

const popupEidtObj = new PopupWithForm('.popup-edit', (evt) => {
  evt.preventDefault();
  user.setUserInfo(popupEidtObj.getInputValues());
  popupEidtObj.close();
} );
popupEidtObj.setEventListeners();

profileAddBtn.addEventListener("click", () => {
  popupAddObj.open();
  addFormValidator.toggleButtonState();
});

buttonEditProfile.addEventListener("click", ()=> {
  popupEidtObj.setInputValues(user.getUserInfo());
  popupEidtObj.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
