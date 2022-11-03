export class Slider {
	constructor(selector, data) {
		this.$slider = document.querySelector(selector)
		this.data = data
		this.slidesCounter = 0

		this.$container = this.$slider.children[1]
		this.cardsCount = 3
		this.cardWidth = 197
	}
	initSlider() {
		//add debounce to optimise
		window.addEventListener('resize', (event) => {
			if (window.innerWidth <= 767) {
				this.cardWidth = 207
				this.cardsCount = 1
			}
		})

		console.log('slider inited: data -', this.data)
		const sliderBtn = this.$slider.querySelectorAll('button')

		sliderBtn.forEach((btn) => {
			btn.addEventListener('click', (btn) => {
				this.checkSliderCounter(this.$container)

				btn.currentTarget.classList.contains('prefers__slide_right')
					? this.slidesCounter++
					: this.slidesCounter--

				this.scrollElement(this.$container)
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
}
