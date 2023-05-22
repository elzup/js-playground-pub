const getMethods = (obj) => Object.getOwnPropertyNames(obj)
const methodsAsString = (obj: object, name: string) =>
	getMethods(obj)
		.map((method) => `${name}.${method}`)
		.join(`\n`)

console.log('Math fields:')
console.log(methodsAsString(Math, 'Math'))

console.log('Object fields:')
console.log(methodsAsString(Object, 'Object'))

console.log('Array fields:')
console.log(methodsAsString(Object, 'Array'))

console.log('object fields:')
console.log(methodsAsString({}, '{}'))

console.log('array fields:')
console.log(methodsAsString([], '[]'))
