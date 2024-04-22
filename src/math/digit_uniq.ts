const l = 10000000000
const start = l / 10
const uniqueDigits = (s) => new Set(s.split('')).size

const counter = new Map()

const progress = (current: number, total: number, hash: string) => {
	const percentage = (current / total) * 100
	process.stdout.clearLine(0)
	process.stdout.cursorTo(0)
	const bar =
		Array(Math.floor(percentage / 3))
			.fill('=')
			.join('') +
		'>'.padEnd(30 - Math.floor(percentage / 3)) +
		` ${current}/${total} `
	process.stdout.write(`${bar} ${percentage.toFixed(2)}%`)
}

function main() {
	for (let i = start; i < l; i++) {
		let s = i.toString()
		counter.set(uniqueDigits(s), (counter.get(uniqueDigits(s)) || 0) + 1)

		if (i % 7654 === 0) {
			progress(i, l, s)
		}
	}
	console.log(counter)
	for (let [k, v] of counter) {
		console.log(k, v)
	}
}

main()

export default {}
