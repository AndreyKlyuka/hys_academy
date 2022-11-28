import IPhotos from './@types/photos.interface'

export default interface IStorage {
	readonly data: IPhotos[]

	init(): void
	getSliderData(): IPhotos[]
	getFormInput(item: string): string
	setFormInput(item: string, value: string): void
	clearFormInput(item: string): void
}
