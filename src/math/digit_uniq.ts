const l = 10000000000
const start = l / 10
const uniqueDigits = (s) => new Set(s.split('')).size

const counter = new Map<number, number>()

const progress = (counter: Map<number, number>) => {
	process.stdout.clearLine(0)
	process.stdout.cursorTo(0)
	process.stdout.write(
		Array.from(counter)
			.map(([k, v]) => `${k}: ${v}`)
			.join(', ')
	)
}

function main() {
	for (let i = start; i < l; i++) {
		let s = i.toString()
		counter.set(uniqueDigits(s), (counter.get(uniqueDigits(s)) || 0) + 1)

		if (i % 7654 === 0) {
			progress(counter)
		}
	}
	console.log(counter)
	for (let [k, v] of counter) {
		console.log(k, v)
	}
}

main()

export default {}
