import IPhotos from '../models/photos'

export class Storage {
	data: IPhotos[]
	constructor(data: IPhotos[]) {
		this.data = data
		this.init()
	}
	init() {
		this.setSliderData()
	}

	setSliderData() {
		localStorage.setItem('sliderData', JSON.stringify(this.data))
	}
	getSliderData(): IPhotos[] {
		return JSON.parse(localStorage.getItem('sliderData') as string)
	}

	getFormInput(item: string): string {
		return localStorage.getItem(item) as string
	}

	setFormInput(item: string, value: string) {
		localStorage.setItem(item, value)
	}

	clearFormInput(item: string) {
		localStorage.removeItem(item)
	}
}
