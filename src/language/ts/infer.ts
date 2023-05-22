/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
type Callback = (v: number) => any
type Argument = number | Callback

type Calc<T> = (v: number) => T
type Return<T> = T extends Callback ? ReturnType<T> : number

function genCalculator<T extends Argument>(arg: T): Calc<Return<T>> {
	if (!['number', 'function'].includes(typeof arg))
		throw new TypeError('invalid arg')

	if (typeof arg === 'function') {
		return (v: number) => arg(v)
	} else {
		return (v: number) => arg as Return<T>
	}
}

const plus1 = genCalculator(1)
const plus2 = genCalculator(2)

const plus3 = genCalculator(() => '')
const plus4 = genCalculator((v) => v * v)

const res = plus2(10)

console.log(res)

type Back<T> = T extends { v: infer U } ? U : number
type Arg = number | { v: any }

function calc<T extends Arg, B extends Back<T>>(arg: T): B {
	if (typeof arg === 'number') {
		return (arg * 10) as B
	} else {
		return arg.v
	}
}

// const argInvalid = calc('')
const extendsNum1 = calc(1) // ng unknown
const extendsNum2 = calc({ v: 10 }) // ok
const extendsStr1 = calc({ v: '' }) // ng string | number

export default {}
