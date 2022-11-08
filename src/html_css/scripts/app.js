import { debounce } from './tools/debounce.js'

import { photosData } from '../data/photos-data.js'

import { paginator } from './pagination.js'
import { Slider } from './slider.js'
import { Storage } from './storage.js'
import { Select } from './select.js'

export class App {
	#slider
	init() {
		//select init
		const select = new Select('.prefers__select', this.onAlbumChange.bind(this))
		// storage init
		const storage = new Storage(photosData)
		const storageData = storage.getSliderData()

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

		nameInput.addEventListener(
			'input',
			debounce((event) => {
				storage.setFormName(event.target.value)
			}, 750)
		)

		phoneInput.addEventListener(
			'input',
			debounce((event) => {
				storage.setFormPhone(event.target.value)
			}, 750)
		)

		emailInput.addEventListener(
			'input',
			debounce((event) => {
				storage.setFormEmail(event.target.value)
			}, 750)
		)

		nameInput.value = storage.getFormName()
		phoneInput.value = storage.getFormPhone()
		emailInput.value = storage.getFormEmail()

		form.addEventListener('submit', () => {
			event.preventDefault()

			storage.clearFormName()
			storage.clearFormPhone()
			storage.clearFormEmail()
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


}
