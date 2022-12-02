import IPhotos from '../models/@types/photos.interface'

import { photosData } from '../data/photos-data'

export default function LocalStorage(storageKey: string) {
	return function (target: Object, propertyKey: string) {
		const getter = () => {
			if (!localStorage.getItem(storageKey)) {
				setter(photosData)


			}
			return JSON.parse(<string>localStorage.getItem(storageKey))
		}

		const setter = (data: IPhotos[]) => {
			localStorage.setItem(storageKey, JSON.stringify(data))
		}

		Object.defineProperty(target, propertyKey, {
			get: getter,
			set: setter,
		})
	}
}
