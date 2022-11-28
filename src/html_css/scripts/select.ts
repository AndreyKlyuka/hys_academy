enum Selects {
	'Select 1' = 1,
	'Select 2',
	'Select 3',
}

export class Select {
	_selector: Element
	constructor(selector: string, onSelectChange: Function) {
		this._selector = <Element>document.querySelector(selector)
		this.init(onSelectChange)
		console.log(Selects)
	}
	init(onSelectChange: Function) {
		this._selector.addEventListener('input', (event) => {
			onSelectChange(
				Selects[(<HTMLInputElement>event.target).value as keyof typeof Selects]
			)
		})
	}
}
