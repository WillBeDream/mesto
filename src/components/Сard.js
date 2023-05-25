
export default class Card {
  constructor(data, templateSelector, handlePopupImageOpen, handlePopupConfirm, handleLike) {
    this.cardData = data;
    this._image = data.link;
    this._title = data.name;
    this._myId = data.myId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._likesCount = data.likes.length;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handlePopupImageOpen = handlePopupImageOpen;
    this._handlePopupConfirm = handlePopupConfirm;
    this._handleLike = handleLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _checkId() {
    if (this._myId === this._ownerId) {
      this._removeButton.style.display = "block";
    } else {
      this._removeButton.style.display = "none";
    }
  }

  _checkLike() {
    this._likes.forEach((element) => {
      if (element._id === this._myId) {
        this._buttonLike.classList.add("element__like_active");
        return;
      }
    });
    this._likeCountElem.textContent = this._likesCount;
  }

  createCard() {
    this._element = this._getTemplate();
    this._photo = this._element.querySelector(".element__photo");
    this._buttonLike = this._element.querySelector(".element__like");
    this._text = this._element.querySelector(".element__text");
    this._removeButton = this._element.querySelector(".element__remove");
    this._likeCountElem = this._element.querySelector(".element__like-count");
    this._text.textContent = this._title;
    this._photo.src = this._image;
    this._photo.alt = this._title;
    this._checkId();
    this._checkLike();
    this._setEventListeners();
    return this._element;
  }

  _openImage = () => {
    this._handlePopupImageOpen(this._title, this._image);
  };

  _changeLike() {
    this._handleLike(this._buttonLike, this._cardId);
  }

  toggleLike(valueLikes) {
    this._buttonLike.classList.toggle("element__like_active");
    this._likeCountElem.textContent = valueLikes.length;
  }

  _deleteCard = () => {
    this._handlePopupConfirm({card: this, cardId: this._cardId});
  }

  removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", ()=>{
      this._changeLike();
    });
    this._element
      .querySelector(".element__remove")
      .addEventListener("click", this._deleteCard);

    this._photo.addEventListener("click", this._openImage);
  }
}
