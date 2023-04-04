const buttonEditProfile = document.querySelector('.profile__edit-button'); //editBtn
const btnsClosePopup = document.querySelectorAll('.popup__close'); //closeBtns
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

function openPopup(popupWindow) {
    popupWindow.classList.add('popup_opened');
}

function closePopup(popupWindow) {
    popupWindow.classList.remove('popup_opened');
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
})

initialCards.forEach(function (card) {
    addCard(card);
})

profileAddBtn.addEventListener('click', openAddPopup);
profileEditForm.addEventListener('submit', handleProfileFormSubmit);
buttonEditProfile.addEventListener('click', openEditPopup);
overlay.addEventListener('keydown', (evt)=> {
  if(evt.key==="Escape") {
    closePopup(popupEdit);
    closePopup(popupAdd);
    closePopup(popupImage);
  }
})

for (const btn of btnsClosePopup) {
    btn.addEventListener('click', (evt) => {
        const popupFind = btn.closest('.popup');
        closePopup(popupFind);
    });
}

for(const btn of popups) {
  btn.addEventListener('click', (evt) => {
    if(evt.target !== evt.currentTarget) {
     return;
    }
    else {
      const popupFind = btn.closest(".popup");
      closePopup(popupFind);
    }
  })
}
