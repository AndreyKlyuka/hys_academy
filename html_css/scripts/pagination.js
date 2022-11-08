export function paginator(selector, data) {
	initPaginator(data, selector)
}
function initPaginator(data, selector) {
	updateCards(data, selector, false)
	const paginationBtns = document.querySelectorAll(
		'.blog__posts-pagination-item'
	)
	paginationBtns.forEach((btn) => {
		btn.addEventListener('click', updateCards(data, selector))
	})
}

const updateCards = function (data, selector, isHandler = true) {
	const cardsContainer = document.querySelector(selector)
	if (isHandler === false) {
		useMarkup(data, 1, cardsContainer)
	}
	return function () {
		const currentCards = document.querySelectorAll('.blog__post')
		const activeButton = document.querySelector(
			'.blog__posts-pagination-item_active'
		)
		currentCards.forEach((card) => {
			card.remove()
		})
		activeButton.classList.remove('blog__posts-pagination-item_active')
		useMarkup(data, +this.innerHTML, cardsContainer)
		this.classList.add('blog__posts-pagination-item_active')
	}
}
function createMarkup(data) {
	return data.map(
		(el) => `<div class="blog__post">
                    <div class="blog__post-left">
                        <h4 class="post__about">DESIGN</h4>
                        <div class="blog__avatar">
                            <img
                                src="./images/courses/courses-avatar1.png"
                                alt="teacher avatar"
                            />
                        </div>
                    </div>
                    <div class="blog__post-right">
                        <div class="post__image post__image_web-design">
                            <img
                                src=${el.thumbnailUrl}
                            />
                        </div>
                        <h3 class="post__title">
                            ${el.title}
                        </h3>
                        <button class="btn btn-green_blog" type="button">
                            Read Now
                        </button>
                    </div>
                </div>`
	)
}
function useMarkup(data, paginationBtn, container) {
	const markup = createMarkup(
		data.slice(paginationBtn * 2 - 2, 2 * paginationBtn)
	)
	markup.forEach((markupEl) =>
		container.insertAdjacentHTML('afterbegin', markupEl)
	)
}
