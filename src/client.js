const btoa = require("btoa");
const request = require("superagent");

class Client {
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
    this.token = null;
  }
  // Internal
  _getUrl(slug) {
    return `${this.baseUrl}${slug}`;
  }
  _defaultHeaders() {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    if (this.token) {
      headers.token = this.token;
    }
    return headers;
  }
  _setToken(token) {
    this.token = token;
  }
  _handleError(error) {
    throw error;
  }
  _handleHTTPError(error) {
    console.log(error);
    let msg;
    try {
      msg = JSON.parse(error.response.text);
    } catch (e) {
      msg = error.response.text;
    }
    throw msg;
  }
  // Requests
  get(slug = "", headers = {}) {
    return request
      .get(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .catch(this._handleHTTPError);
  }
  post(slug = "", data = {}, headers = {}) {
    return request
      .post(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  put(slug = "", data = {}, headers = {}) {
    return request
      .put(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  delete(slug = "", data = {}, headers = {}) {
    return request
      .delete(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  // Authentication
  login(username, phoneNumber) {
    return this.post("/user/login", {
      username,
      phoneNumber
    })
      .then(res => {
        this._setToken(res.body.token);
        return res;
      })
      .then(res => {
        return res.body;
      })
      .catch(this._handleError);
  }
  register(userName, phoneNumber) {
    return this.post("/user/register", {
      userName,
      phoneNumber
    })
      .then(res => {
        // this._setToken(res.body.token);
        return res;
      })
      .then(res => {
        return res.body;
      })
      .catch(this._handleError);
  }
  // Rooms
  createRoom(title, owner) {
    return this.post("/room/new", {
      title,
      owner
    })
      .then(res => res.body)
      .catch(this._handleError);
  }
  listRooms() {
    return this.get("/room/list")
      .then(res => res.body)
      .catch(this._handleError);
  }
}

let client = new Client("http://localhost:8080");

let user = {
  _id: "5b933843bfde01490c9fbd88",
  phoneNumberVerifiedAt: null,
  username: "sam",
  phoneNumber: "4062104444",
  created: "2018-09-08T02:47:31.570Z"
};



  client.login(user.username, user.phoneNumber)
  .then(res => client.createRoom("This is the first room", user._id))
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
