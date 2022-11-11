import { debounce } from './tools/debounce.js'

import { photosData } from '../data/photos-data.js'

import { paginator } from './pagination.js'
import { Slider } from './slider.js'
import { Storage } from './storage.js'
import { Select } from './select.js'


export class App {
	#slider
	#storage
	init() {
		//select init
		const select = new Select('.prefers__select', this.onAlbumChange.bind(this))

		// storage init
		this.#storage = new Storage(photosData)
		const storageData = this.#storage.getSliderData()

		// pagination and slider init
		paginator('.blog__posts', storageData)
		this.#slider = new Slider('.prefers__slider', storageData)

		//slick slider init
		$(document).ready(function () {
			$('.courses__cards-container').slick({
				mobileFirst: true,
				variableWidth: true,
				slidesToShow: 1,
				slidesToScroll: 1,

				prevArrow: $('.courses__slide_left'),
				nextArrow: $('.courses__slide_right'),

				responsive: [
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 1440,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						},
					},
				],
			})
		})

		// save form value in storage
		const form = document.getElementById('form')
		const nameInput = form.querySelector('.blog__form-name')
		const phoneInput = form.querySelector('.blog__form-phone')
		const emailInput = form.querySelector('.blog__form-email')

		this.addListenerToInput([nameInput, phoneInput, emailInput], ['formName', 'formPhone', 'formEmail'])

		nameInput.value = this.#storage.getFormInput('formName')
		phoneInput.value = this.#storage.getFormInput('formPhone')
		emailInput.value = this.#storage.getFormInput('formEmail')

		form.addEventListener('submit', () => {
			event.preventDefault()

			this.#storage.clearFormInput('formName')
			this.#storage.clearFormInput('formPhone')
			this.#storage.clearFormInput('formEmail')

			nameInput.value = ''
			phoneInput.value = ''
			emailInput.value = ''
		})
	}

	onAlbumChange(albumId) {
		fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.#slider.clearData()
				this.#slider.setData(data.slice(0, 5))

			})
			.catch((error) => {
				console.log('Error: ', error);
			});
	}

	addListenerToInput(inputElements, value) {
		inputElements.forEach((inputElements, index) => {
			inputElements.addEventListener(
				'input',
				debounce((event) => {
					this.#storage.setFormInput(value[index], event.target.value)
				}, 750)
			)
		})
	}
}
