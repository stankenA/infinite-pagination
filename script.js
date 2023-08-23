import Post from "./components/Post.js";
import View from "./components/View.js";
import { api } from "./components/Api.js";

function createNewPost(item) {
	const postElement = new Post({
		templateSelector: '#post-template',
		data: item,
	});

	const newPost = postElement.createPost();
	return newPost;
}

const initialPosts = new View({
	renderer: (item) => {
		const post = createNewPost(item);

		initialPosts.addItem(post);
	}
}, '.posts__list');

async function fetchAllProducts() {
	try {
		const products = await api.getAllProducts();
		initialPosts.renderItems(products.products.reverse());

	} catch (error) {
		console.log(error)
	}
}

fetchAllProducts();
