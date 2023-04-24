const overlay = document.body;

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
  popupWindow.classList.remove("popup_opened");
  overlay.removeEventListener("keydown", closeByEscape);
}

export { closeByEscape, openPopup, closePopup };
