enum Selects {
	Select1 = 1,
	Select2,
	Select3,
}

export class Select {
	_selector: Element
	constructor(selector: string, onSelectChange: Function) {
		this._selector = <Element>document.querySelector(selector)
		this.init(onSelectChange)
	}
	init(onSelectChange: Function) {
		this._selector.addEventListener('input', (event) => {
			onSelectChange((<HTMLInputElement>event.target).value)
		})
	}
}
