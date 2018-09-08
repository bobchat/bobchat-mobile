const btoa = require('btoa');
const request = require('superagent');

class Client {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
    this.token = null;
  }
  // Internal
  _getUrl(slug) {
    return `${this.baseUrl}${slug}`;
  }
  _defaultHeaders() {
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (this.token) {
      headers.token = this.token
    };
    return headers;
  }
  _setToken(token) {
    this.token = token;
  }
  _handleError(error) {
    throw error;
  }
  _handleHTTPError(error) {
    console.error(error)
    let msg;
    try {
      msg = JSON.parse(error.response.text);
    } catch (e) {
      msg = error.response.text;
    }
    throw msg;
  }
  // Requests
  get(slug = '', headers = {}) {
    return request
      .get(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .catch(this._handleHTTPError);
  }
  post(slug = '', data = {}, headers = {}) {
    return request
      .post(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  put(slug = '', data = {}, headers = {}) {
    return request
      .put(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  delete(slug = '', data = {}, headers = {}) {
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
  login(email, password) {
    let authorization = 'Basic ' + btoa(`${email}:${password}`);
    return this
      .get('/auth/login', {
        authorization
      })
      .then(res => {
        this._setToken(res.body.token);
        return res.body;
      })
      .catch(this._handleError);
  }
  register(registerData) {
    return this
      .post('/user/register', registerData)
      .then(res => {
        this._setToken(res.body.token);
        return res;
      })
      .then(res => {
        return res.body;
      })
      .catch(this._handleError);
  }
  // Addresses
  createAddress(address) {
    return this
      .post('/address/new', address)
      .then(res => res.body)
      .catch(this._handleError);
  }
  listAddresses() {
    return this
      .get('/address/list')
      .then(res => res.body)
      .catch(this._handleError);
  }
  updateAddress(address) {
    return this
      .put('/address/update', address)
      .then(res => res.body)
      .catch(this._handleError);
  }
  deleteAddress(id) {
    return this
      .delete('/address/delete', { id: id })
      .then(res => res.body)
      .catch(this._handleError);
  }
}

let client = new Client('http://localhost:8080');


let user = {
  username: 'sam',
  phoneNumber: '4062104444'
};

client.register(user)
.then(res => {
  console.log(res);
})
.catch(err => console.error(err));
