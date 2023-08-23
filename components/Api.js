import { configApi } from "../vendor/constants.js";

class Api {
	constructor({ url, headers }) {
		this._url = url;
		this._headers = headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`Что-то пошло не так: ${res.status}`);
	}

	_request(url, options) {
		return fetch(url, options).then(this._checkResponse)
	}

	getAllProducts() {
		return this._request(`${this._url}/products`, {
			headers: this._headers
		})
	}

	getNumberOfProducts(limit, skip) {
		return this._request(`${this._url}/products?limit=${limit}&skip=${skip}`, {
			headers: this._headers
		})
	}
}

export const api = new Api(configApi);
