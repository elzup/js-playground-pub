const isLeap = false
const total = isLeap ? 366 : 365

const dayOfYearToMonthDay = (
	day: number,
	isLeap = false
): { m: number; d: number } => {
	const daysInMonth = (month: number): number =>
		[0, 31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]

	let month = 1
	let days = day

	while (days > daysInMonth(month)) {
		days -= daysInMonth(month)
		month++
	}

	return { m: month, d: days }
}

const range = (n) => [...Array(n).keys()]
const rates = range(total).map((t) => {
	const i = t + 1
	const { m, d } = dayOfYearToMonthDay(i, isLeap)

	const mRate = m / d
	const iRate = i / total

	return { m, d, i, mRate, iRate, diff: Math.abs(mRate - iRate) }
})

const round = (v: number, n = 4) =>
	Math.round(v * Math.pow(10, n)) / Math.pow(10, n)

const roundSt = (v: number) => String(round(v)).padEnd(6, '0')

rates.sort((a, b) => a.diff - b.diff)
const rateStr = ({ m, d, i, diff, mRate, iRate }: typeof rates[number]) =>
	`${m}/${d} [${String(i).padStart(3, ' ')}] => ` +
	`${roundSt(diff)} = (${roundSt(mRate)} - ${roundSt(iRate)})`

console.log(
	range(10)
		.map((i) => rates[i])
		.map(rateStr)
		.join('\n')
)

const du = 1 / total

console.log(`1du = ${du} = 1/${total}`)

const roundDu = (v: number) => String(round(v / du, 1))
const rateStrDu = ({ m, d, i, diff, mRate, iRate }: typeof rates[number]) =>
	`${m}/${d} [${String(i).padStart(3, ' ')}] => ` +
	`${roundDu(diff).padEnd(3, ' ')}du = (${roundDu(mRate).padStart(
		5,
		' '
	)}du - ${roundDu(iRate).padStart(5, ' ')}du)`

console.log(
	range(10)
		.map((i) => rates[i])
		.map(rateStrDu)
		.join('\n')
)

export default {}
