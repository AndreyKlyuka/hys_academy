import $ from 'jquery'
import 'slick-carousel'
import debounce from 'lodash.debounce'

import { paginator } from './pagination'
import { Slider } from './slider'
import { Storage } from './storage'
import { Select } from './select'

import IPhotos from '../models/photos'

import { photosData } from '../data/photos-data'

export class App {
	_slider: Slider
	_storage: Storage
	_storageData: IPhotos[]

	constructor() {
		this._storage = new Storage(photosData)
		this._storageData = this._storage.getSliderData()

		this._slider = new Slider('.prefers__slider', this._storageData)
	}
	init() {
		//select init
		new Select('.prefers__select', this.onAlbumChange.bind(this))

		// storage init
		this._storage = new Storage(photosData)
		const storageData = this._storage.getSliderData()

		// pagination and slider init
		paginator('.blog__posts', storageData)
		this._slider = new Slider('.prefers__slider', storageData)

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
						breakpoint: 1980,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						},
					},
				],
			})
		})

		// save form value in storage
		const form = <HTMLFormElement>document.getElementById('form')
		const nameInput = <HTMLInputElement>form.querySelector('.blog__form-name')
		const phoneInput = <HTMLInputElement>form.querySelector('.blog__form-phone')
		const emailInput = <HTMLInputElement>form.querySelector('.blog__form-email')

		this.addListenerToInput(
			[nameInput, phoneInput, emailInput],
			['formName', 'formPhone', 'formEmail']
		)

		nameInput.value = this._storage.getFormInput('formName')
		phoneInput.value = this._storage.getFormInput('formPhone')
		emailInput.value = this._storage.getFormInput('formEmail')

		form?.addEventListener('submit', (event) => {
			event.preventDefault()

			this._storage.clearFormInput('formName')
			this._storage.clearFormInput('formPhone')
			this._storage.clearFormInput('formEmail')

			nameInput.value = ''
			phoneInput.value = ''
			emailInput.value = ''
		})
	}

	onAlbumChange(albumId: number) {
		fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				this._slider.clearData()
				this._slider.setData(data.slice(0, 5))
			})
			.catch((error) => {
				console.log('Error: ', error)
			})
	}

	addListenerToInput(inputElements: HTMLInputElement[], value: string[]) {
		inputElements.forEach((inputElements, index) => {
			inputElements.addEventListener(
				'input',
				debounce((event) => {
					this._storage.setFormInput(value[index], event.target.value)
				}, 750)
			)
		})
	}
}
