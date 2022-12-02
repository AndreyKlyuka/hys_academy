
import debounce from 'lodash.debounce'

import Storage from '../scripts/storage'
import Slider from '../scripts/slider'
import Select from '../scripts/select'

import Menu from '../scripts/mobile-menu'

export default abstract class AbstractApp {
	private _baseUrl: string = 'https://jsonplaceholder.typicode.com/albums/'

	constructor(
		protected _storage: Storage | undefined,
		protected _slider: Slider | undefined,
		protected _select: Select | undefined,
		protected _menu: Menu | undefined
	) {}


	abstract init(): void

	protected onAlbumChange(albumId: number): void {
		fetch(`${this._baseUrl}${albumId}/photos?_start=0&_limit=5`)
			.then((response) => response.json())
			.then((data) => {

				if (this._storage) {
					this._storage?.setSliderData(data)
					this._slider?.clearData()
					this._slider?.setData(this._storage.getSliderData())

					if (this._slider) this._slider.slidesCounter = 0
					this._slider?.scrollElement(this._slider._sliderElements)
				} else console.error('Storage class is disabled: cant change select')
			})
			.catch((error) => {
				console.log('Error: ', error.message)
			})
	}

	protected addListenerToInput(
		inputElements: HTMLInputElement[],
		value: string[]
	): void {
		inputElements.forEach((inputElements, index) => {
			inputElements.addEventListener(
				'input',
				debounce((event) => {
					this._storage?.setFormInput<string>(value[index], event.target.value)
				}, 750)
			)
		})
	}

	protected abstract initPaginator(): void
	protected abstract initHeader(): void
	protected abstract initSlick(): void
	protected abstract initForm(): void

}
