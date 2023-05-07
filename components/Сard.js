import { openPopup } from "../utils/utils.js";

export default class Card {
  constructor(data, templateSelector, popupImage) {
    this._image = data.link;
    this._title = data.name;
    this._templateSelector = templateSelector;
    this._popupImg = popupImage;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._photo = this._element.querySelector(".element__photo");
    this._buttonLike = this._element.querySelector(".element__like");
    this._text = this._element.querySelector(".element__text");
    this._removeButton = this._element.querySelector(".element__remove");
    this._text.textContent = this._title;
    this._photo.src = this._image;
    this._photo.alt = this._title;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._buttonLike.classList.toggle("element__like_active");
    });
    this._element
      .querySelector(".element__remove")
      .addEventListener("click", () => {
        this._element.remove();
      });
    this._photo.addEventListener("click", () => {
      this._previewImg = this._popupImg.querySelector(".popup__image");
      this._previewImg.src = this._image;
      this._previewImg.alt = this._title;
      this._popupImg.querySelector(".popup__description").textContent =
        this._title;
      openPopup(this._popupImg);
    });
  }
}
