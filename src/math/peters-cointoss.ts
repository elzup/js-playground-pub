const win = 2
const los = 1 / win - 0.1

// const win = 2
// const los = 0.5

const staticsApproach = () => {
	let v = 100
	let sum = 0

	for (let i = 0; i < 10000; i++) {
		const rate = Math.random() < 0.5 ? win : los

		v *= rate
		sum += v

		if (i % 1000 === 0) {
			// console.log(v)
			console.log(sum / (i + 1))
		}
	}
}

const mathApproach = () => {
	console.log({ win, los, win_x_los: win * los })

	for (let k = 1; k <= 20; k++) {
		// const k = 3
		let sum = 1

		for (let i = 0; i < 2 ** k; i++) {
			const faces = i.toString(2).padStart(k, '0').split('')

			let x = 1

			faces.forEach((v) => {
				x *= v === '1' ? win : los
			})
			// console.log({ x })
			sum += x
		}
		console.log(`${k}: ${sum / 2 ** k}`)
	}
}

mathApproach()
