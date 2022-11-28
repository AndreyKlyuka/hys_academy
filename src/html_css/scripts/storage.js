export class Storage {
	constructor(data) {
		this.data = data
		this.init()
	}
	init() {
		this.setSliderData()
	}

	setSliderData() {
		localStorage.setItem('sliderData', JSON.stringify(this.data))
	}
	getSliderData() {
		return JSON.parse(localStorage.getItem('sliderData'))
	}

	// getFormName() {
	// 	return localStorage.getItem('formName')
	// }
	// getFormPhone() {
	// 	return localStorage.getItem('formPhone')
	// }
	// getFormEmail() {
	// 	return localStorage.getItem('formEmail')
	// }

	getFormInput(input) {
		return localStorage.getItem(input)

	}

	// setFormName(value) {
	// 	localStorage.setItem('formName', value)
	// }
	// setFormPhone(value) {
	// 	localStorage.setItem('formPhone', value)
	// }
	// setFormEmail(value) {
	// 	localStorage.setItem('formEmail', value)
	// }

	setFormInput(input, value) {
		localStorage.setItem(input, value)
	}

	// clearFormName() {
	// 	localStorage.removeItem('formName')
	// }
	// clearFormPhone() {
	// 	localStorage.removeItem('formPhone')
	// }
	// clearFormEmail() {
	// 	localStorage.removeItem('formEmail')
	// }

	clearFormInput(input) {
		localStorage.removeItem(input)
	}
}
