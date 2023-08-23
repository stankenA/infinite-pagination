export default class Post {
	constructor({ templateSelector, data }) {
		this._templateSelector = templateSelector;

		this._id = data.id;
		this._img = data.thumbnail;
		this._title = data.title;
		this._txt = data.description;
		this._category = data.category;
		this._price = data.price;
	}

	_getTemplate() {
		const postElement = document
			.querySelector(this._templateSelector)
			.content
			.querySelector('.posts__item')
			.cloneNode(true);
		return postElement;
	}

	createPost() {
		this._element = this._getTemplate();

		this._postCount = this._element.querySelector('.posts__count');
		this._postPicture = this._element.querySelector('.posts__img');
		this._postTitle = this._element.querySelector('.posts__subtitle');
		this._postTxt = this._element.querySelector('.posts__txt');
		this._postCategory = this._element.querySelector('.posts__category');
		this._postPrice = this._element.querySelector('.posts__price');

		this._postCount.textContent = this._id;
		this._postPicture.src = this._img;
		this._postTitle.textContent = this._title;
		this._postTxt.textContent = this._txt;
		this._postCategory.textContent = this._category;
		this._postPrice.textContent = this._price + '$';

		return this._element;
	}
}
