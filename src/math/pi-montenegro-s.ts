const range = (n) => [...Array(n).keys()]

const calcPi = (split: number) => {
	const s = split ** 2
	const dh = 1 / split
	let t = 0

	range(split).forEach((y) => {
		const x = Math.sqrt(s - y ** 2)

		t += x * dh
	})
	return (t * 4) / split
}

range(9).forEach((i) => console.log(10 ** i, calcPi(10 ** i)))

export {}
