import coursesAvatar from '../images/courses/courses-avatar.png'

export function paginator(selector, data) {
	initPaginator(data, selector)
}


function initPaginator(data, selector) {
	const paginator = document.querySelector(selector)

	updateCards(data, selector, false)

	paginator.addEventListener('click', (event) => {
		const target = event.target
		if (target.tagName === 'BUTTON') {
			updateCards(data, selector).call(target)
		}

	})
}
const updateCards = function (data, selector, isHandler = true) {
	const cardsContainer = document.querySelector(selector)

	if (!isHandler) useMarkup(data, 1, cardsContainer)

	return function () {
		const currentCards = document.querySelectorAll('.blog__post')
		const activeButton = document.querySelector(
			'.blog__posts-pagination-item_active'
		)

		currentCards.forEach((card) => card.remove())
		activeButton.classList.remove('blog__posts-pagination-item_active')
		useMarkup(data, this.innerHTML, cardsContainer)
		this.classList.add('blog__posts-pagination-item_active')

	}
}

function useMarkup(data, paginationBtn, container) {
	const markup = createMarkup(
		data.slice(paginationBtn * 2 - 2, 2 * paginationBtn)
	)
	markup.forEach((markupEl) =>
		container.insertAdjacentHTML('afterbegin', markupEl)
	)
}

function createMarkup(data) {
	return data.map(
		(el) => `<div class="blog__post">
                    <div class="blog__post-left">
                        <h4 class="post__about">DESIGN</h4>
                        <div class="blog__avatar">
                            <img
                                src=${coursesAvatar}
                                alt="teacher avatar"
                            />
                        </div>
                    </div>
                    <div class="blog__post-right">
                        <div class="post__image">
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
