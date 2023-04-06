const buttonEditProfile = document.querySelector('.profile__edit-button'); //editBtn
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const textEditTitle = document.querySelector('#title'); //editMenuTitle
const textEditDescription = document.querySelector('#description'); //editMenuDescription
const profileEditForm = document.forms['edit-form']; //saveForm
const profileAddBtn = document.querySelector('.profile__add-button'); //addBtn
const cardAddForm = document.forms['add-form']; //addElem
const popupImage = document.querySelector('.popup_show-image');
const cardPreviewImage = document.querySelector('.popup__image');
const cardPreviewCaption = document.querySelector('.popup__description'); //descrLabel
const title = document.querySelector('#add-title');
const link = document.querySelector('#add-description');
const cardTemplate = document.querySelector('#element-template').content;
const cardsContainer = document.querySelector('.elements');
const overlay = document.body;
const popups = document.querySelectorAll('.popup');
const popupAddButton = document.querySelector("#popup__add-button");

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const popupFind = document.querySelector(".popup_opened");
    closePopup(popupFind);
  }
}

function openPopup(popupWindow) {
  popupWindow.classList.add("popup_opened");
  overlay.addEventListener("keydown", closeByEscape);
}

function closePopup(popupWindow) {
    popupWindow.classList.remove('popup_opened');
    overlay.removeEventListener('keydown', closeByEscape);
}

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

function createCard(cardData) {
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const photo = card.querySelector('.element__photo');
    const buttonLike = card.querySelector('.element__like');
    card.querySelector('.element__text').textContent = cardData.name;
    photo.alt = cardData.name;
    photo.src = cardData.link;
    photo.addEventListener('click', () => {
        cardPreviewImage.src = cardData.link
        cardPreviewImage.alt = cardData.name
        cardPreviewCaption.textContent = cardData.name;
        openPopup(popupImage);
    });
    buttonLike.addEventListener('click', () => {
        buttonLike.classList.toggle('element__like_active');
    });
    card.querySelector('.element__remove').addEventListener('click', () => {
        card.remove();
    });
    return card;
}

function addCard(cardData) {
    const card = createCard(cardData);
    cardsContainer.prepend(card);
}

cardAddForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const card = { name: title.value, link: link.value }
    addCard(card);
    closePopup(popupAdd);
    cardAddForm.reset();
    popupAddButton.classList.add("popup__save-button_disabled");
    popupAddButton.disabled = true;
})

initialCards.forEach(function (card) {
    addCard(card);
})

profileAddBtn.addEventListener('click', openAddPopup);
profileEditForm.addEventListener('submit', handleProfileFormSubmit);
buttonEditProfile.addEventListener('click', openEditPopup);

popups.forEach((popup) => {
  popup.addEventListener('mousedown',(evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if(evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})
