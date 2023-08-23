import Post from "./components/Post.js";
import View from "./components/View.js";
import { api } from "./components/Api.js";
import { morePostsBtn, observerOptions } from "./vendor/constants.js";

// Создание поста
function createNewPost(item) {
	const postElement = new Post({
		templateSelector: '#post-template',
		data: item,
	});

	const newPost = postElement.createPost();
	return newPost;
}

// Элемент, отвечающий за рендер постов
const initialPosts = new View({
	renderer: (item) => {
		const post = createNewPost(item);

		initialPosts.addItem(post);
	}
}, '.posts__list');

// Запрос постов с пагинацией
let numberOfPosts = 0;

async function fetchNumberOfProducts(isFirstFetch) {
	try {
		const products = await api.getNumberOfProducts(5, numberOfPosts);
		numberOfPosts += 5;
		initialPosts.renderItems(products.products);

		if (isFirstFetch) {
			observer.observe(morePostsBtn);
		}

		if (numberOfPosts === 100) {
			observer.disconnect();
			morePostsBtn.textContent = 'End of line.';
			morePostsBtn.classList.remove('posts__more_active');
		}
	} catch (error) {
		console.log(error)
	}
}

// Observer
const showMorePosts = function (entries) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			fetchNumberOfProducts(false);
		}
	});
};
const observer = new IntersectionObserver(showMorePosts, observerOptions);

// Первый запрос
fetchNumberOfProducts(true);
