const enableValidationConfig = {
  formSelector: ".popup__set",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__text_type_error");
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__text_type_error");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement)=> {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_disabled");
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove("popup__save-button_disabled");
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__text"));
  const buttonElement = formElement.querySelector(".popup__save-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = (enableValidationConfig) => {
  const formList = Array.from(document.querySelectorAll(enableValidationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation(enableValidationConfig);
