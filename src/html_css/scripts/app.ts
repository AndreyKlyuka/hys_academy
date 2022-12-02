import $ from 'jquery'
import 'slick-carousel'


import AbstractApp from '../models/app.model'


import { photosData } from '../data/photos-data'
import AbstractApp from '../models/app.model'


import Menu from './mobile-menu'
import Slider from './slider'
import Storage from './storage'
import Select from './select'
import paginator from './pagination'
import addStickyHeader from './sticky-header'

import Readonly from '../decorators/Readonly.decorator'

interface AppProps {
	storage?: Storage
	select?: Select
	slider?: Slider
	menu?: Menu
}
export default class App extends AbstractApp {
	constructor(props: AppProps) {
		super(props.storage, props.slider, props.select, props.menu)
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

		this.initHeader()
	}

	protected initPaginator(): void {
		paginator('.blog__posts', photosData)
	}

	protected initHeader(): void {
		addStickyHeader()
	}


	protected initSlick(): void {
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


	protected initForm(): void {
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
}
