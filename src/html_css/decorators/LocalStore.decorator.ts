export default function LocalStore(target: Object, propertyKey: string) {
	console.log(target, propertyKey)
}
// export default function LocalStorage(storageKey: string) {
// 	return function (
// 		target: Object,
// 		propertyKey: string,
// 		descriptor: PropertyDescriptor
// 	) {
// 		console.log(storageKey)
// 	}
// }
