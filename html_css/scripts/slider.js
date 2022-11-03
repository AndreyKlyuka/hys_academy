import { debounce } from './tools/debounce.js'

export class Slider {
	#slider = null
	#sliderElements = null
	#data = null

	constructor(selector, data) {
		this.#slider = document.querySelector(selector)
		this.#data = data
		this.#sliderElements = this.#slider.children[1]

		this.cardsCount = 3
		this.cardWidth = 197
		this.slidesCounter = 0

		this.initSlider()
	}
	initSlider() {
		this.checkSliderEvents()
		this.setData(this.#data)
		this.initButtons()
	}
	initButtons() {
		const sliderBtns = this.#slider.querySelectorAll('button')

		sliderBtns.forEach((btn) => {
			btn.addEventListener('click', (btn) => {
				this.checkSliderCounter(this.#sliderElements)

				btn.currentTarget.classList.contains('prefers__slide_right')
					? this.slidesCounter++
					: this.slidesCounter--

				this.scrollElement(this.#sliderElements)
				// console.log(this.cardWidth)
			})
		})
	}

	scrollElement(selector) {
		selector.scrollTo({
			top: 0,
			left: (this.cardWidth + 20) * this.slidesCounter,
			behavior: 'smooth',
		})
	}

	checkSliderCounter(selector) {
		if (Math.floor(selector.scrollLeft / this.cardWidth) !== this.slidesCounter)
			this.slidesCounter = Math.floor(selector.scrollLeft / this.cardWidth)
	}

	checkSliderEvents() {
		const sliderEvents = ['DOMContentLoaded', 'resize']
		sliderEvents.forEach((event) => {
			window.addEventListener(
				event,
				debounce(
					function () {
						if (window.innerWidth <= 767) {
							this.cardWidth = 207
							this.cardsCount = 1
						} else {
							this.cardWidth = 197
							this.cardsCount = 3
						}
					}.bind(this),
					1000
				)
			)
		})
	}

	setData(data) {
		const markup = this.createElement(data)
		markup.forEach((markupEl) => {
			this.#sliderElements.insertAdjacentHTML('afterbegin', markupEl)
		})
	}

	createElement(data) {
		return data.map(
			(el) =>
				`<div class="prefers__item" style="background-image: url('${el.url}');">
					<h3 class="prefers__item-title">${el.title}</h3>
				</div>`
		)
	}
}
