export default function Readonly(readability: boolean) {
	return function (
		target: Object,
		propertyKey: string | Symbol,
		descriptor: PropertyDescriptor
	) {
		descriptor.writable = descriptor.configurable = !readability
	}
}
