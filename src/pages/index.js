import "./index.css";
import {
  enableValidationConfig,
  dataProfile,
  buttonEditProfile,
  profileEditForm,
  profileAddBtn,
  cardAddForm,
  profileAvatar,
  avatarForm,
} from "../utils/constants.js";
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";

const addFormValidator = new FormValidator(cardAddForm, enableValidationConfig);
const editFormValidator = new FormValidator(
  profileEditForm,
  enableValidationConfig
);
const avatarFormValidator = new FormValidator(avatarForm, enableValidationConfig);
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "e6a0e803-edb8-48ba-914a-f56a2f7674a9",
    "Content-Type": "application/json",
  },
});

const popupDeleteObj = new PopupWithDelete('.popup-delete', ({card, cardId}) => {
  api
    .deleteCard(cardId)
    .then(() => {
      card.removeCard();
    })
    .catch((err) => {
      console.log(err);
    });
  popupDeleteObj.close();
})
popupDeleteObj.setEventListeners();

const createCard = (item) => {
  const card = new Card(item, "#element-template", popupImageObj.open, popupDeleteObj.open, (likeEl, cardId) => {
    if(likeEl.classList.contains('element__like_active')) {
      api
        .removeLike(cardId)
        .then((res) => {
          console.log(res);
          card.toggleLike(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .addLike(cardId)
        .then((res) => {
          console.log(res);
          card.toggleLike(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const cardElement = card.createCard();
  return cardElement;
}

const popupImageObj = new PopupWithImage(".popup_show-image");
popupImageObj.setEventListeners();
const user = new UserInfo(dataProfile);

const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardCreated = createCard(item);
      cardList.addItem(cardCreated);
    }
  },
  ".elements"
)

/*
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
*/

const popupAddObj = new PopupWithForm('.popup-add', (evt) => {
  evt.preventDefault();
  const dataForm = popupAddObj.getInputValues();
  console.log(dataForm);
  const data = {name: dataForm['add-title'], link: dataForm['add-description']};
  popupAddObj.startRender();
  Promise.all([api.addCard(data), api.getInfo()])
    .then(([cardInfo, userInfo]) => {
      cardInfo.myId = userInfo._id;
      console.log(cardInfo);
      const cardCreated = createCard(cardInfo);
      cardList.addItem(cardCreated);
    })
    .catch((err) => {
      console.log(err);
    });
  popupAddObj.close();
  popupAddObj.endRender();
} );
popupAddObj.setEventListeners();

const popupEidtObj = new PopupWithForm('.popup-edit', (evt) => {
  evt.preventDefault();
  popupEidtObj.startRender();
  api
    .setInfo(popupEidtObj.getInputValues())
    .then((res) => {
      user.setUserInfo({
        title: res.name,
        description: res.about,
        avatar: res.avatar,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  popupEidtObj.close();
  popupEidtObj.endRender();
} );
popupEidtObj.setEventListeners();

const popupAvatarObj = new PopupWithForm('.popup-avatar', (evt) => {
  evt.preventDefault();
  const dataForm = popupAvatarObj.getInputValues();
  popupAvatarObj.startRender();
  api
    .setAvatar(dataForm)
    .then((res) => {
      user.setUserInfo({
        title: res.name,
        description: res.about,
        avatar: res.avatar,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  popupAvatarObj.close();
  popupAvatarObj.endRender();
})
popupAvatarObj.setEventListeners();

profileAddBtn.addEventListener("click", () => {
  popupAddObj.open();
  addFormValidator.toggleButtonState();
});

buttonEditProfile.addEventListener("click", () => {
  popupEidtObj.setInputValues(user.getUserInfo());
  popupEidtObj.open();
});

profileAvatar.addEventListener('click', () => {
  popupAvatarObj.open();
  avatarFormValidator.toggleButtonState();
})

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([userInfo, cardInfo]) => {
    cardInfo.forEach((element) => {
      element.myId = userInfo._id;
      const cardCreated = createCard(element);
      cardList.addItem(cardCreated);
    });
    user.setUserInfo({
      title: userInfo.name,
      description: userInfo.about,
      avatar: userInfo.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });
/*
api.getInfo().then((res)=>console.log(res));

api.getInitialCards().then((res) => console.log(res));
*/
cardList.renderItems();








