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

let mainId;
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
      popupDeleteObj.close();
    })
    .catch((err) => {
      console.log(err);
    });

})
popupDeleteObj.setEventListeners();

const createCard = (item) => {
  const card = new Card(item, "#element-template", popupImageObj.open, popupDeleteObj.open, (likeEl, cardId) => {
    if(likeEl.classList.contains('element__like_active')) {
      api
        .removeLike(cardId)
        .then((res) => {
          card.toggleLike(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .addLike(cardId)
        .then((res) => {
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
    renderer: (item) => {
      const cardCreated = createCard(item);
      cardList.addItem(cardCreated);
    }
  },
  ".elements"
)

const popupAddObj = new PopupWithForm('.popup-add', (data) => {
  const dataNew = {name: data['add-title'], link: data['add-description']};
  popupAddObj.renderLoading(true);
  api.addCard(dataNew)
    .then((cardInfo) => {
      cardInfo.myId = mainId;
      const cardCreated = createCard(cardInfo);
      cardList.addItem(cardCreated);
      popupAddObj.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      popupAddObj.renderLoading(false);
    })

} );
popupAddObj.setEventListeners();

const popupEidtObj = new PopupWithForm('.popup-edit', (data) => {
  popupEidtObj.renderLoading(true);
  api
    .setInfo(data)
    .then((res) => {
      user.setUserInfo({
        title: res.name,
        description: res.about,
        avatar: res.avatar,
      });
      popupEidtObj.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      popupEidtObj.renderLoading(false);
    })

  popupEidtObj.endRender();
} );
popupEidtObj.setEventListeners();

const popupAvatarObj = new PopupWithForm('.popup-avatar', (data) => {
  popupAvatarObj.renderLoading(true);
  api
    .setAvatar(data)
    .then((res) => {
      user.setUserInfo({
        title: res.name,
        description: res.about,
        avatar: res.avatar,
      });
      popupAvatarObj.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      popupAvatarObj.renderLoading();
    })


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
    mainId = userInfo._id;
    cardInfo.forEach((element)=>{
      element.myId = userInfo._id;
    })
    cardList.renderItems(cardInfo);
    /*
    cardInfo.forEach((element) => {
      element.myId = userInfo._id;
      const cardCreated = createCard(element);
      cardList.addItem(cardCreated);
    });
    */
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
api.getInfo().then((res)=>console.log(res));*/
/*
api.getInitialCards().then((res) => console.log(res));
*/









