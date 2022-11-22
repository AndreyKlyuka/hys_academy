import $ from 'jquery'
import 'slick-carousel'
import debounce from 'lodash.debounce'

import { photosData } from '../data/photos-data'

import paginator from './pagination'
import Menu from './mobile-menu'
import Slider from './slider'
import Storage from './storage'
import Select from './select'

import IPhotos from '../models/@types/photos.interface'

import AbstractApp from '../models/app.model'
import Readonly from '../decorators/Readonly.decorator'

export default class App extends AbstractApp {
	_storageData!: IPhotos[]

	constructor(
		storage: Storage | undefined,
		slider: Slider | undefined,
		select: Select | undefined,
		menu: Menu | undefined
	) {
		super(storage, slider, select, menu)
	}

	@Readonly(true)
	public init() {
		this._storage?.init()

		this._slider?.initSlider(
			this._storage !== undefined ? this._storage!.sliderData : photosData
		)

		this._select?.init(this.onAlbumChange.bind(this))

		if (this._storage?.sliderData && this._select) {
			this._select!._selector.selectedIndex = this._storage.selectOptionCounter
		}

		this._menu?.init()

		this.initSlick()

		this.initForm()

		this.initPaginator()
	}

	protected initPaginator() {
		paginator('.blog__posts', photosData)
	}

	protected initMenu() {
		new Menu('menu', '.header__menu')
	}

	protected initSlick() {
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
	}

	protected initForm() {
		if (this._storage) {
			const form = <HTMLFormElement>document.getElementById('form')
			const nameInput = <HTMLInputElement>form.querySelector('.blog__form-name')
			const phoneInput = <HTMLInputElement>(
				form.querySelector('.blog__form-phone')
			)
			const emailInput = <HTMLInputElement>(
				form.querySelector('.blog__form-email')
			)

			this.addListenerToInput(
				[nameInput, phoneInput, emailInput],
				['formName', 'formPhone', 'formEmail']
			)

			nameInput.value = this._storage!.getFormInput<string>('formName')
			phoneInput.value = this._storage!.getFormInput<string>('formPhone')
			emailInput.value = this._storage!.getFormInput<string>('formEmail')

			form.addEventListener('submit', (event) => {
				event.preventDefault()

				this._storage!.clearFormInput<string>('formName')
				this._storage!.clearFormInput<string>('formPhone')
				this._storage!.clearFormInput<string>('formEmail')

				nameInput.value = ''
				phoneInput.value = ''
				emailInput.value = ''
			})
		} else console.error('Storage class is disabled')
	}

	protected addListenerToInput(
		inputElements: HTMLInputElement[],
		value: string[]
	) {
		inputElements.forEach((inputElements, index) => {
			inputElements.addEventListener(
				'input',
				debounce((event) => {
					this._storage!.setFormInput<string>(value[index], event.target.value)
				}, 750)
			)
		})
	}
}
