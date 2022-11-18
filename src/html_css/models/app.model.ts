import Storage from '../scripts/storage'
import Slider from '../scripts/slider'

import IPhotos from './@types/photos.interface'

export default abstract class AbstractApp {
	abstract _slider: Slider
	abstract _storage: Storage
	abstract _storageData: IPhotos[]

	private _baseUrl: string = 'https://jsonplaceholder.typicode.com/albums/'

	abstract init(): void

	protected onAlbumChange(albumId: number): void {
		fetch(`${this._baseUrl}${albumId}/photos?_start=0&_limit=5`)
			.then((response) => response.json())
			.then((data) => {
				this._slider.clearData()
				this._slider.setData(data)
			})
			.catch((error) => {
				console.log('Error: ', error)
			})
	}
	protected abstract initForm(): void

	protected abstract addListenerToInput(
		inputElements: HTMLInputElement[],
		value: string[]
	): void
}