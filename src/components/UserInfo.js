export default class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.nameSelector);
    this._profileDescription = document.querySelector(data.descriptionSelector);
    this._profileAvatar = document.querySelector(data.profileSelector)
  }

  getUserInfo() {
    return { title: this._profileName.textContent, description: this._profileDescription.textContent };
  }

  setUserInfo({ title, description, avatar}) {
    this._profileAvatar.src = avatar;
    this._profileName.textContent = title;
    this._profileDescription.textContent = description;
  }
}
