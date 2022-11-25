import debounce from 'lodash.debounce'

enum DisplayState {
	'BLOCK' = 'block',
	'NONE' = 'none',
}

export default class Menu {
	openState: boolean = false
	selector: HTMLElement
	burger: NodeListOf<HTMLElement>

	constructor(selector: string, burger: string) {
		this.selector = <HTMLElement>document.getElementById(selector)
		this.burger = <NodeListOf<HTMLElement>>document.querySelectorAll(burger)
	}

	init() {
		this.controlMenu()
		this.checkMenuSize()
	}
	setOpenState(state: boolean) {
		this.openState = state
	}

	controlMenu() {
		this.burger.forEach((el) => {
			el.addEventListener('click', this.toggleMenu.bind(this))
		})
		this.selector.addEventListener('click', (event: Event) => {
			if ((<HTMLElement>event.target).closest('a')) this.closeMenu()
		})
	}
	openMenu() {
		this.selector.style.display = DisplayState['BLOCK']
	}
	closeMenu() {
		this.selector.style.display = DisplayState['NONE']
	}

	toggleMenu() {
		this.openState = !this.openState
		if (this.openState) this.openMenu()
		else this.closeMenu()
	}

	checkMenuSize() {
		window.addEventListener(
			'resize',
			debounce(function (this: Menu) {
				if (window.innerWidth >= 768 && this.openState) {
					this.toggleMenu()
				}
			}, 200).bind(this)
		)
	}
}
