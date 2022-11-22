import debounce from 'lodash.debounce'

export default class Menu {
	openState: boolean = false
	selector: HTMLElement
	burger: NodeListOf<HTMLElement>

	constructor(selector: string, burger: string) {
		this.selector = <HTMLElement>document.getElementById(selector)
		this.burger = <NodeListOf<HTMLElement>>document.querySelectorAll(burger)
		this.init()
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
	}
	openMenu() {
		this.selector.style.display = 'block'
	}
	closeMenu() {
		this.selector.style.display = 'none'
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
				if (window.innerWidth >= 768) {
					this.setOpenState(false)
					this.closeMenu()
				}
			}, 200).bind(this)
		)
	}
}
