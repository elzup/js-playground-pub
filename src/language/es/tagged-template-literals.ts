/* eslint no-unused-expressions: ["error", { "allowTaggedTemplates": true }] */

// ()ありとなしで分ける

import _ from 'lodash'

function mapTemplate(callback: (v: number) => number | string) {
	return (parts: TemplateStringsArray, ...vals: number[]) =>
		vals.reduce((p, c, k) => p + String(callback(c)) + parts[k + 1], parts[0])
}

const fillTemplate = mapTemplate((v) => `${v}`.padStart(3, '0'))
const doubleTemplate = mapTemplate((v) => v * 2)

const v = {
	a: 0,
	b: 200,
	c: 23,
}

console.log(`a: ${v.a}, b: ${v.b}, c: ${v.c}`)
// => a: 0, b: 200, c: 23
console.log(fillTemplate`a: ${v.a}, b: ${v.b}, c: ${v.c}`)
// => a: 000, b: 200, c: 023
console.log(doubleTemplate`a: ${v.a}, b: ${v.b}, c: ${v.c}`)
// => a: 0, b: 400, c: 46
console.log(mapTemplate((v) => -v)`a: ${v.a}, b: ${v.b}, c: ${v.c}`)
// => a: 0, b: -200, c: -23

function format(arr: unknown[]) {
	return (parts: TemplateStringsArray, ...vals: number[]) =>
		vals.reduce((p, c, k) => p + `${arr[c]}` + parts[k + 1], parts[0])
}

console.log(format([1, 2, 3])`${0} + ${1} - ${0} = ${2} - ${0}`)
// => 1 + 2 - 1 = 3 - 1
console.log(format(['nya-'])`(Ф∀Ф)${0}${0}`)
// => (Ф∀Ф)nya-nya-

function reduceJoin<T>(
	callback: (
		previousValue: string,
		currentValue: T,
		index: number,
		array: unknown[]
	) => string
) {
	return (parts: TemplateStringsArray, ...vals: T[]) => {
		return vals.reduce(
			(p, c, i, a) => p + callback(p, c, i, a) + parts[i + 1],
			parts[0]
		)
	}
}

function format2(arr: string[]) {
	return reduceJoin<number>((_, v) => arr[v])
}

console.log(format2(['nya-'])`(Ф∀Ф)${0}${0}`)

const dump = (...args: any[]) => {
	console.log(...args)
}

dump(1, 2, 3, 4)
// => 1 2 3 4

dump`a b c d e`
// => [ 'a b c d e' ]

dump`a ${'b'} c ${'d'} e`
// => [ 'a ', ' c ', ' e' ] 'b' 'd'

console.log`a ${'b'} c ${'d'} e`
// => [ 'a ', ' c ', ' e' ] 'b' 'd'

const aVar = 'a'

dump`this is a ${aVar} day${'!'}`
dump(['this is a ', ' day', ''], aVar, '!')

console.log(_.fill`a${'*'}b${1}c${3}`)
console.log(
	((a: TemplateStringsArray, ...[b, c]: number[]) =>
		a[b] + a[-~b] + a[c])`ロ${1}朝${0}プ`
)

const orderString = (a: TemplateStringsArray, ...indexs: number[]) =>
	Object.entries(indexs)
		.sort(([, i1], [, i2]) => i1 - i2)
		.map(([i]) => a[parseInt(i) + 1])
		.join(',')

console.log(orderString`${4}four${0}zero${3}three${1}one${2}two`)
// => [LOG]: "zero,one,two,three,four"

// type EmbedFunc<T> = T => string
//
// function embedFuncBuilder<T>(
// 	parts: string[],
// 	...funcs: EmbedFunc<T>[]
// ): EmbedFunc<T> {
// 	return params =>
// 		funcs.reduce((p, c, k) => p + c(params) + parts[k + 1], parts[0])
// }
//
// // type Args = { name: string }
//
// // const githubURL: EmbedFunc<Args> = embedFuncBuilder`https://github.com/${p => p.name}`
//
// // => https://github.com/elzup
//
// type CParams = {
// 	method: 'POST' | 'GET',
// 	url: string,
// 	headers: { [key: string]: string },
// }
// const explodeHeader = p =>
// 	Object.keys(p.headers)
// 		.map(k => `-H '${k}: ${p.headers[k]}'`)
// 		.join(' ')
// const curlCommand: EmbedFunc<CParams> = embedFuncBuilder`curl -X ${p =>
// 	p.method} ${p => p.url} ${explodeHeader}`
//
// curlCommand({
// 	method: 'GET',
// 	url: 'https://elzup.com',
// 	headers: { HOGE: 'v1', FUGA: 'v2' },
// })
// // => curl -X GET https://elzup.com -H 'HOGE: v1' -H 'FUGA: v2'
//
