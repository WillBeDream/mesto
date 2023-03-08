const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editMenuTitle = document.querySelector('#title');
const editMenuDescription = document.querySelector('#description');
const saveForm = document.querySelector('.popup__container');
//const btnsLike = document.querySelectorAll('.element__like');

function addEditMenu() {
    popup.classList.add('popup_opened');
    editMenuTitle.value = profileTitle.textContent;
    editMenuDescription.value = profileDescription.textContent;
}

function closeEditMenu() {
    popup.classList.remove('popup_opened');
}

/*for (const btn of btnsLike) {
    btn.addEventListener('click', () => {
        if (!btn.classList.contains('element__like_active'))
            btn.classList.add('element__like_active');
        else {
            btn.classList.remove('element__like_active');
        }
    })
}*/

function saveData(evt) {
    evt.preventDefault();
    profileTitle.textContent = editMenuTitle.value;
    profileDescription.textContent = editMenuDescription.value;
    closeEditMenu();
}

editBtn.addEventListener('click', addEditMenu);
closeBtn.addEventListener('click', closeEditMenu);
saveForm.addEventListener('submit', saveData);
