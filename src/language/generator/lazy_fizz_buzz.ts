function* cycle(arr) {
	while (true) {
		for (let v of arr) {
			yield v
		}
	}
}

function fizz() {
	return cycle([null, null, 'Fizz'])
}

function buzz() {
	return cycle([null, null, null, null, 'Buzz'])
}

function* beatCounter(beats) {
	for (let i = 1; true; i++) {
		const hits = beats.filter((t) => t.next().value !== null)

		yield hits.length === 0 ? i : hits.join('')
	}
}

function fizzbuzzCounter() {
	return beatCounter([fizz(), buzz()])
}

function empArray(n) {
	return Array(n).fill(0)
}

const fbi = fizzbuzzCounter()
const res = empArray(20).map(() => fbi.next().value)

console.log(' FizzBuzz')
console.log(res.join('\n'))

const elzi = beatCounter([
	cycle(['', 'yo']),
	cycle(['', '', 'tick', '', '', 'tack']),
])
const res2 = empArray(30).map(() => elzi.next().value)

console.log(' origin counter')
console.log(res2.join('\n'))
