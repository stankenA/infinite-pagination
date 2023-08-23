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

async function fetchNumberOfProducts() {
	observer.disconnect();

	try {
		const response = await api.getNumberOfProducts(5, numberOfPosts);
		initialPosts.renderItems(response.products);
		numberOfPosts += 5;

		if (numberOfPosts === 100) {
			observer.disconnect();
			morePostsBtn.textContent = 'End of line.';
			morePostsBtn.classList.remove('posts__more_active');
			return;
		}

		observer.observe(morePostsBtn);
	} catch (error) {
		console.log(error);
		morePostsBtn.classList.remove('posts__more_active');
		morePostsBtn.textContent = 'Some error occured';
	}
}

// Observer
const showMorePosts = function (entries) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			fetchNumberOfProducts();
		}
	});
};
const observer = new IntersectionObserver(showMorePosts, observerOptions);

// Первый запрос
fetchNumberOfProducts();
