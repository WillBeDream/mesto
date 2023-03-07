let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');
let editMenuTitle = document.querySelector('#title');
let editMenuDescription = document.querySelector('#description');
let saveForm = document.querySelector('.popup__container');
let btnsLike = document.querySelectorAll('.element__like');

function addEditMenu()
{
    popup.classList.add('popup_opened');
    editMenuTitle.value = profileTitle.textContent;
    editMenuDescription.value = profileDescription.textContent;
}

function closeEditMenu()
{
    popup.classList.remove('popup_opened');
}

for(const btn of btnsLike)
{
    btn.addEventListener('click', ()=>
    {
        if (!btn.classList.contains('element__like_active'))
        btn.classList.add('element__like_active');
        else {
            btn.classList.remove('element__like_active');
        }
    })
}

function saveData(evt) 
{
    evt.preventDefault();
    profileTitle.textContent = editMenuTitle.value;
    profileDescription.textContent = editMenuDescription.value;
    closeEditMenu();
}

editBtn.addEventListener('click', addEditMenu );
closeBtn.addEventListener('click', closeEditMenu);
saveForm.addEventListener('submit', saveData);
