const range = (n) => [...Array(n).keys()]
const prod = (a, b) => a * b

const calcPi = (rep = 100000) =>
	range(rep)
		.map((i) => 2 * (i + 1))
		.map((i) => i ** 2 / ((i - 1) * (i + 1)))
		.reduce(prod, 1) * 2

range(8).forEach((i) => console.log(10 ** i, calcPi(10 ** i)))
