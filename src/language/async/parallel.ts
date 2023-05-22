import _ from 'lodash'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const sleepMax = 10
const n = 10
const sleepRnadom = () => sleep(Math.random() * sleepMax)
const sleepReset = () => sleep(n * sleepMax)

;(async () => {
	const a = Array(n)
		.fill(0)
		.map((v, i) => i)

	const print = async (n: number | string) => {
		await sleepRnadom()
		console.log(n)
	}

	console.log('-- for')
	for (let i = 0; i < a.length; i++) {
		await print(a[i])
	}
	await sleepReset()

	console.log('-- async each')
	a.forEach(print)
	await sleepReset()

	console.log('-- async map')
	a.map(print)
	await sleepReset()

	console.log('-- async _.each')
	_.each(a, print)
	await sleepReset()

	console.log('-- async reduce')
	a.reduce((p, _c) => {
		print(p)
		return 0
	})
})()
