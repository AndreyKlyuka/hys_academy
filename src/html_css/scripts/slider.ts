import debounce from 'lodash.debounce'

import IPhotos from '../models/photos'

export class Slider {
	_slider: HTMLElement
	_sliderElements: HTMLElement
	_data: IPhotos[]
	cardsCount: number
	cardWidth: number
	slidesCounter: number

	constructor(selector: string, data: IPhotos[]) {
		this._slider = <HTMLElement>document.querySelector(selector)
		this._data = data
		this._sliderElements = <HTMLElement>this._slider.children[1]

		this.cardsCount = 3
		this.cardWidth = 197
		this.slidesCounter = 0

		this.initSlider()
	}

	initSlider() {
		this.checkSliderEvents()
		this.setData(this._data)
		this.initButtons()
	}

	initButtons() {
		this._slider.addEventListener('click', (event) => {
			const target = (<HTMLElement>event.target).closest('button')

			if (!target) return null

			this.checkSliderCounter(this._sliderElements)

			target.classList.contains('prefers__slide_right')
				? this.slidesCounter++
				: this.slidesCounter--

			this.scrollElement(this._sliderElements)
		})
	}

	scrollElement(selector: HTMLElement) {
		selector.scrollTo({
			top: 0,
			left: (this.cardWidth + 20) * this.slidesCounter,
			behavior: 'smooth',
		})
	}

	checkSliderCounter(selector: HTMLElement) {
		if (Math.floor(selector.scrollLeft / this.cardWidth) !== this.slidesCounter)
			this.slidesCounter = Math.floor(selector.scrollLeft / this.cardWidth)
	}

	checkSliderEvents(this: Slider) {
		const sliderEvents: string[] = ['DOMContentLoaded', 'resize']
		sliderEvents.forEach((event) => {
			window.addEventListener(
				event,
				debounce(
					function (this: Slider) {
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

	setData(data: IPhotos[]) {
		const markup: string[] = this.createElement(data)
		markup.forEach((markupEl) => {
			this._sliderElements.insertAdjacentHTML('afterbegin', markupEl)
		})
	}
	clearData() {
		this._sliderElements.innerHTML = ''
	}

	createElement(data: IPhotos[]): string[] {
		return data.map(
			(el) =>
				`<div class="prefers__item" style="background-image: url('${el.url}');">
					<h3 class="prefers__item-title">${el.title}</h3>
				</div>`
		)
	}
}
