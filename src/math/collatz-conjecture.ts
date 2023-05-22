/* eslint-disable @typescript-eslint/no-non-null-assertion */

const N = 1000
const isEven = (n: number) => n % 2 === 0

const collatzEvenFn = (n: number) => n / 2
// const collatzOddFn = (n: number) => 3 * n + 1
const collatzOddFnEx = (n: number) => (3 * n + 1) / 2

const calcNextCollatzNumber = (n: number) =>
	isEven(n) ? collatzEvenFn(n) : collatzOddFnEx(n)

const memo = new Map<number, number>()
const memoSteps = new Map<number, number[]>()

const calcCollatzSteps = (n: number) => {
	let count = 0
	let number = n
	const steps: number[] = []

	while (number > 1) {
		if (memo.has(number)) {
			const branchCount = count
			const dupCount = memo.get(number)!

			count += dupCount
			steps.push(...memoSteps.get(number)!)
			memo.set(n, count)
			memoSteps.set(n, steps)

			return { n, count, steps, branchCount, dupCount }
		}
		count++
		number = calcNextCollatzNumber(number)
		steps.push(number)
	}
	memo.set(n, count)
	memoSteps.set(n, steps)
	return { n, count, steps, branchCount: count, dupCount: 0 }
}

const range = (n) => [...Array(n).keys()]
const results = range(N)
	.map((n) => calcCollatzSteps(n + 1))
	.map((v) => ({ ...v, stepsStr: v.steps.slice(0, 20).map(String).join(',') }))

// results.forEach(({ n, count, branchCount, dupCount, stepsStr }) => {
// 	console.log(`${n}[${count}] <${branchCount}:${dupCount}> (${stepsStr}`)
// })

console.log(['n', 'count', 'branchCount', 'dupCount', 'steps'].join('\t'))

results.forEach(({ n, count, branchCount, dupCount, stepsStr }) => {
	console.log([n, count, branchCount, dupCount, stepsStr].join('\t'))
})

export {}
