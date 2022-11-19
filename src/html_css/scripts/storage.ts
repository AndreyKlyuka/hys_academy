import IPhotos from '../models/@types/photos.interface'
import IStorage from '../models/storage.model'

import LocalStore from '../decorators/LocalStore.decorator'

export class Storage implements IStorage {
	@LocalStore
	readonly data: IPhotos[]

	constructor(data: IPhotos[]) {
		this.data = data
		this.init()
	}

	init() {
		this.setSliderData()
	}

	getSliderData<T>(): T {
		return JSON.parse(<string>localStorage.getItem('sliderData'))
	}

	getFormInput<T extends string>(item: T): T {
		return <T>localStorage.getItem(item)
	}

	setFormInput<T extends string>(item: T, value: T) {
		localStorage.setItem(item, value)
	}

	clearFormInput<T extends string>(item: T) {
		localStorage.removeItem(item)
	}

	private setSliderData() {
		localStorage.setItem('sliderData', JSON.stringify(this.data))
	}
}
