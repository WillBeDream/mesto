export default class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.nameSelector);
    this._profileDescription = document.querySelector(data.descriptionSelector);
  }

  getUserInfo() {
    return { title: this._profileName.textContent, description: this._profileDescription.textContent };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.title;
    this._profileDescription.textContent = data.description;
  }
}
