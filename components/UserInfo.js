export default class UserInfo {
  constructor(data) {
    this._profileName = data.name;
    this._profileDescription = data.description;
  }

  getUserInfo() {
    return { name: this._profileName.textContent, description: this._profileDescription.textContent };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.description;
  }
}
