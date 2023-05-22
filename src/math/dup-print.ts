import { sprintf } from 'sprintf-js'

const N = Math.pow(2, 3 * 5)
const LIMIT = 1000
const PRINT_INTERVAL = 10

let sum = 0

for (let i = 1; i <= LIMIT; i++) {
	const d = ((1 - sum) * i) / N

	sum += d
	if (i % PRINT_INTERVAL === 0) {
		console.log(sprintf('%5d: %6.2f%%', i, sum * 100))
	}
}
