export default class View {
	constructor({ renderer }, containerSelector) {
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	addItem(element) {
		this._container.append(element);
	}

	renderItems(items) {
		items.forEach(element => {
			this._renderer(element);
		});
	}
}
