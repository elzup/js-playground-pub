// 1 - 5*(1/2)^3+9*((1 * 3)/(2 * 4))^3 - 13*((1*3*5)/(2*4*6))^3

const factorial = (n: number) => {
	let t = 1

	for (let i = 1; i <= n; i++) {
		t *= i
	}
	return t
}

const chudnovskySub = (n: number) => {
	const a = (-1) ** n * factorial(6 * n) * (13591409 + 545140134 * n)
	const b = factorial(3 * n) * factorial(n) ** 3 * 640320 ** (3 * n + 3 / 2)

	console.log(`sub ${n}: ${a} ${b}`)

	return a / b
}

const chudnovsky = (n: number) => {
	let t = 0

	for (let i = 0; i < n; i++) {
		t += chudnovskySub(i)
	}
	return 1 / (t * 12)
}

console.log(chudnovsky(1))
