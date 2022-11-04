export class Storage {
	constructor(data) {
		this.data = data
		this.init()
	}
	init() {
		this.setSliderData()
	}

	setSliderData() {
		window.localStorage.setItem('sliderData', JSON.stringify(this.data))
	}
	getSliderData() {
		const sliderData = window.localStorage.getItem('sliderData')
		return JSON.parse(sliderData)
	}

	getFormName() {
		return window.localStorage.getItem('formName')
	}
	getFormPhone() {
		return window.localStorage.getItem('formPhone')
	}
	getFormEmail() {
		return window.localStorage.getItem('formEmail')
	}

	setFormName(value) {
		window.localStorage.setItem('formName', value)
	}
	setFormPhone(value) {
		window.localStorage.setItem('formPhone', value)
	}
	setFormEmail(value) {
		window.localStorage.setItem('formEmail', value)
	}

	clearFormName() {
		window.localStorage.removeItem('formName')
	}
	clearFormPhone() {
		window.localStorage.removeItem('formPhone')
	}
	clearFormEmail() {
		window.localStorage.removeItem('formEmail')
	}
}
