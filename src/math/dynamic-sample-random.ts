function dynamicSampleRandom(a: number[], n: number): number[] {
	const b: number[] = []

	a.forEach((v, i) => {
		const all = a.length - i
		const least = n - b.length

		if (Math.random() < least / all) b.push(v)
	})
	return b
}

function main() {
	const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	const res = Object.fromEntries(a.map((x) => [x, 0]))

	for (let i = 0; i < 1000000; i++) {
		for (const t of dynamicSampleRandom(a, Math.floor(Math.random() * 10))) {
			res[t] += 1
		}
	}
	console.log(res)
}

main()
