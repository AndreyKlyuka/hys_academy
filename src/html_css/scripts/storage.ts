import IPhotos from '../models/@types/photos.interface'
import IStorage from '../models/storage.model'


import LocalStorage from '../decorators/LocalStorage.decorator'
// import { photosData } from '../data/photos-data'

export default class Storage implements IStorage<IPhotos> {
	@LocalStorage('sliderDate')
	localData!: IPhotos[]
	sliderData!: IPhotos[]
	selectOptionCounter!: number


	init() {
		this.sliderData = this.getSliderData()
		this.selectOptionCounter = this.sliderData[0].albumId - 1
	}


	getSliderData() {
		return this.localData
	}

	setSliderData(data: IPhotos[]) {
		this.localData = data

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
