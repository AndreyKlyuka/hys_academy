import { Selects } from '../models/@types/select.enum'
import ISelect from '../models/select.model'

export default class Select implements ISelect {
	readonly _selector: HTMLSelectElement

	constructor(selector: string, onSelectChange: Function) {
		this._selector = <HTMLSelectElement>document.querySelector(selector)
		this.init(onSelectChange)
	}

	private init(onSelectChange: Function) {
		this._selector.addEventListener('input', (event) => {
			onSelectChange(
				Selects[<keyof typeof Selects>(<HTMLInputElement>event.target).value]
			)
		})
	}
}
