import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._buttonConfirm = this._popup.querySelector(".popup__save-button");
  }

  _deleteCard() {
    this._handleDeleteCard({card: this._item, cardId: this._cardId});
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener("click", () => {
      this._deleteCard();
    });
  }

  open = ({card, cardId}) => {
    super.open();
    this._item = card;
    this._cardId = cardId;
  };
}
