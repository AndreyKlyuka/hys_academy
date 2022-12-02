import IPhotos from './@types/photos.interface'


export default interface IStorage<T> {
	localData: T[]

	sliderData: T[]
	selectOptionCounter: number


	init(): void
	getSliderData(): T[]
	setSliderData(data: T[]): void

	getFormInput(item: string): string
	setFormInput(item: string, value: string): void
	clearFormInput(item: string): void
}
