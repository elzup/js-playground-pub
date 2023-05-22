const range = (n) => [...Array(n).keys()]

const calcPi = (r = 10000) => {
	const s = r ** 2
	let hit = 0

	range(r).forEach((w) => {
		const w2 = w ** 2

		range(r).forEach((h) => {
			if (w2 + h ** 2 <= s) hit++
		})
	})
	return (hit / s) * 4
}

range(5)
	.map((i) => 10 ** (i + 1))
	.forEach((r) => console.log(`${r})`, calcPi(r)))

export {}
