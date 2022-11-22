import { Selects } from '../models/@types/select.enum'
import ISelect from '../models/select.model'

export default class Select implements ISelect {
	readonly _selector: HTMLSelectElement
	_applyFunction!: Function

	constructor(selector: string) {
		this._selector = <HTMLSelectElement>document.querySelector(selector)
	}

	init(onSelectChange: Function) {
		this._selector.addEventListener('input', (event) => {
			onSelectChange(
				Selects[<keyof typeof Selects>(<HTMLInputElement>event.target).value]
			)
		})
	}
}
