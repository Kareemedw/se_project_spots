class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;

    this.checkResponse = this.checkResponse.bind(this);
  }

  checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}`);
  }

  request(path, options = {}) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: this._headers,
      ...options,
    }).then(this.checkResponse);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return this.request("/cards");
  }

  getUserInfo(res) {
    return this.request("/users/me");
  }

  addCard({ link, name }) {
    return this.request("/cards", {
      method: "POST",
      body: JSON.stringify({ link, name }),
    });
  }

  editUserInfo({ name, about }) {
    return this.request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  editAvatarInfo(avatar) {
    return this.request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  deleteCard(id) {
    return this.request(`/cards/${id}`, {
      method: "DELETE",
    });
  }

  handleLikes(id, isLiked) {
    return this.request(`/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
    });
  }
}

export default Api;
