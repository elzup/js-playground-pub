import moment from 'moment'

// util
const sum = (a: number[]) => a.reduce((p, c) => p + c, 0)

export const range = (a: number, b: number): number[] => {
	if (a > b) {
		return []
	}
	return [...Array(b - a + 1).keys()].map((v) => v + a)
}

export const isLeapYear = (y: number) =>
	(y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
const heiseiToAD = (y: number) => y + 1988
const adToHeisei = (y: number) => y - 1988

export const is31month = (m: number) => ((m >> 3) ^ m) & 1

const monthDayCount = (y: number, m: number) => {
	if (m === 2) {
		return isLeapYear(y) ? 29 : 28
	}
	return is31month(m) ? 31 : 30
}
const yearDayCount = (y: number) => (isLeapYear(y) ? 366 : 365)

const countHeiseiDayYearRange = (yStart: number, yEnd: number) => {
	const dayCounts = range(yStart, yEnd).map(heiseiToAD).map(yearDayCount)

	return sum(dayCounts)
}

export const countFinishedHeiseiDay = (y: number, m: number, d: number) => {
	const m1 = moment({ year: 1989, month: 0, day: 7 })
	const m2 = moment({ year: y, month: m - 1, day: d })

	return m2.diff(m1, 'days')
}

export const countFinishedHeiseiDay2 = (y: number, m: number, d: number) => {
	const c1 = countHeiseiDayYearRange(1, adToHeisei(y))
	const c2 = sum(range(1, m - 1).map((mi) => monthDayCount(y, mi)))

	return c1 + c2 + d - 1
}
