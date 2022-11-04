export class Select {
    #selector
    constructor(selector, onSelectChange) {
        this.#selector = document.querySelector(selector)
        this.init(onSelectChange)
    }
    init(onSelectChange) {
        this.#selector.addEventListener('input', () => {
            onSelectChange(event.target.value)
        })
    }


}