const editBtn = document.querySelector('.profile__edit-button');
const closeBtns = document.querySelectorAll('.popup__close');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editMenuTitle = document.querySelector('#title');
const editMenuDescription = document.querySelector('#description');
const saveForm = document.querySelector('.popup__set');
const btnsLike = document.querySelectorAll('.element__like');
const avatar = document.querySelector('.element__photo');
const addBtn = document.querySelector('.profile__add-button');
const addElem = document.forms['add-form'];
const removeBtns = document.querySelectorAll('.element__remove');
const popupImage = document.querySelector('.popup-show-image');
const imageLabel = document.querySelector('.popup__image');
const descrLabel = document.querySelector('.popup__description');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openMenu(popupWindow) {
    popupWindow.classList.add('popup_opened');
}

function closeMenu(evt) {
    evt.target.parentElement.parentElement.classList.remove('popup_opened');
}

function openEditMenu() {
    openMenu(popupEdit);
    editMenuTitle.value = profileTitle.textContent;
    editMenuDescription.value = profileDescription.textContent;
}

function openAddMenu() {
    openMenu(popupAdd);
}

function saveData(evt) {
    evt.preventDefault();
    profileTitle.textContent = editMenuTitle.value;
    profileDescription.textContent = editMenuDescription.value;
    popupEdit.classList.remove('popup_opened');
}

function like(evt) {
    evt.target.classList.toggle('element__like_active');
}

function removeElem(evt) {
    evt.target.parentElement.remove();
}

function openImageMenu(evt) {
    imageLabel.src = evt.target.getAttribute('src');
    descrLabel.textContent = evt.target.nextElementSibling.nextElementSibling.firstElementChild.textContent;
    openMenu(popupImage);
}

for (btn of removeBtns) {
    btn.addEventListener('click', (evt) => {
        removeElem(evt);
    })
}

for (const btn of btnsLike) {
    btn.addEventListener('click', (evt) => {
        like(evt);
    })
}

for (const btn of closeBtns) {
    btn.addEventListener('click', (evt) => {
        evt.target.parentElement.parentElement.classList.remove('popup_opened');
    })
}

function addElement(titleValue, linkValue) {
    const elementTemplate = document.querySelector('#element-template').content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__text').textContent = titleValue;
    element.querySelector('.element__photo').src = linkValue;
    element.querySelector('.element__photo').addEventListener('click', openImageMenu);
    element.querySelector('.element__like').addEventListener('click', like);
    element.querySelector('.element__remove').addEventListener('click', removeElem);
    const elementsContainer = document.querySelector('.elements');
    elementsContainer.prepend(element);
}

addElem.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const title = document.querySelector('#add-title');
    const link = document.querySelector('#add-description');
    addElement(title.value, link.value);
    popupAdd.classList.remove('popup_opened');
} )

initialCards.forEach(function(elem) {
    addElement(elem.name, elem.link);
})

editBtn.addEventListener('click', openEditMenu);
addBtn.addEventListener('click', openAddMenu);
saveForm.addEventListener('submit', saveData);
