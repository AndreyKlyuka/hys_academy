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
		return JSON.parse(<string>localStorage.getItem('sliderData'))
	}

	getFormInput(item: string): string {
		return <string>localStorage.getItem(item)
	}

	setFormInput(item: string, value: string) {
		localStorage.setItem(item, value)
	}

	clearFormInput(item: string) {
		localStorage.removeItem(item)
	}
}
