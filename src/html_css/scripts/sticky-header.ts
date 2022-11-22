export default function addStickyHeader(): void {
	window.addEventListener('scroll', () => {
		const header: HTMLElement = <HTMLElement>document.querySelector('.header')
		header.classList.toggle('sticky', window.scrollY > header.clientHeight)
	})
}
