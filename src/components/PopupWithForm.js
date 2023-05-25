import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__text");
    this._popupForm = this._popup.querySelector('.popup__set');
    this._formValues = {};
    this._button = this._popup.querySelector(".popup__save-button");
    this._buttonCommonText = this._button.textContent;
  }

  getInputValues() {
    this._inputList.forEach((input)=> {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input)=>{
      input.value = data[input.name];
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._button.textContent = `${this._button.textContent}...`;
    }
    else {
      this._button.textContent = this._buttonCommonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues());
    });
  }
}
