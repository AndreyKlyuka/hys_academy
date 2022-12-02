import IPhotos from './@types/photos.interface'

export default interface ISlider {
	_slider: HTMLElement
	_sliderElements: HTMLElement
	_data: IPhotos[]
	cardsCount: number
	cardWidth: number
	slidesCounter: number

	initSlider(): void

	setData(data: IPhotos[]): void

	clearData(): void

}

