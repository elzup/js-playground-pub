import { isHoliday } from 'japanese-holidays'
import { range } from 'lodash'

const day1 = 1000 * 60 * 60 * 24
const startDays = [
	['gw__', 4, 10],
	['obon', 8, 1],
	['xmas', 12, 15],
] as const

const isObon = (date: Date) =>
	date.getMonth() + 1 === 8 && [13, 14, 15].includes(date.getDate())

const isNenshi = (date: Date) =>
	date.getMonth() + 1 === 1 && date.getDate() <= 3
const isNenmatsu = (date: Date) =>
	date.getMonth() + 1 === 12 && date.getDate() >= 24
const isYeen = (date: Date) => isNenshi(date) || isNenmatsu(date)

const format = (d: Date) =>
	new Date(+d + 9 * 60 * 60 * 1000).toISOString().slice(0, 10)

const formatD = (d: Date) => d.getDate()

const fromYear = 2023
const toYear = 2026

const sandSign = '.'
const holiSign = '@'
const wekdSign = '+'

function main() {
	console.log('記号について')
	console.log(
		holiSign + ' 祝日(振替休日含む), 年末年始(Xmas~1/3), お盆(8/13~15)'
	)
	console.log(sandSign + ' 休日 >= 平日ルール(挟まれている平日のみ)')
	console.log(wekdSign + ' 土日')
	console.log(`<曜日タイプ>` + ' 1/1の曜日')

	for (let y = fromYear; y <= toYear; y++) {
		const did = new Date(y, 0, 1).getDay()

		startDays.forEach(([id, m, d]) => {
			const baseDate = new Date(y, m - 1, d)

			// let restStock = 0 // 振替休日の引き継ぎ
			const days = [...Array(50).keys()]
				.map((i) => new Date(baseDate.getTime() + day1 * i))
				.map((day) => {
					const isWekd = [0, 6].includes(day.getDay())
					const isHoli = Boolean(isHoliday(day)) || isObon(day) || isYeen(day)
					// let isCast = false

					// if (isRest && isHoli) {
					// 	restStock += 1
					// }
					// if (!isRest && !isHoli && restStock > 0) {
					// 	restStock -= 1
					// 	isCast = true
					// }

					return {
						date: day,
						isRest: isWekd || isHoli,
						isHoli,
						isWekd,
						isSand: false,
					}
				})

			// console.log(
			// 	days.map((v) => [format(v.date), v.isRest, v.isHoli, v.isSatd])
			// )

			const restDays: Record<number, boolean> = {}

			range(days.length - 7 + 1)
				.map((i) => range(7).map((j) => Object.entries(days)[i + j]))
				.forEach((week) => {
					const hn = week.filter(([, v]) => v.isRest).length
					const dn = 7 - hn

					if (dn <= hn) {
						// console.log('sisandwiched')
						// console.log(format(week[0][1].date))
						// console.log(format(week[6][1].date))
						// 休日に挟まれている部分だけを休みにする
						const firstRest = week.findIndex(([, v]) => v.isRest)
						// .findLastIndex

						week.reverse()
						const lastRest =
							week.length - week.findIndex(([, v]) => v.isRest) - 1

						week.reverse() // fix

						// console.log(firstRest)
						// console.log(lastRest)
						// console.log(week[firstRest])
						// console.log(week[lastRest])

						range(firstRest, lastRest).forEach((i) => {
							const d = week[i]

							if (!restDays[Number(d[0])] && !d[1].isRest) {
								days[d[0]].isSand = true
							}
							restDays[Number(d[0])] = true
						})
					}
				})
			let chains: typeof days[number][] = []
			let chainsCurrent: typeof days[number][] = []

			// console.log(restDays)

			days.forEach((d) => {
				if (d.isSand || d.isRest) {
					chainsCurrent.push(d)
				} else {
					// console.log({ chains, chainsCurrent })
					if (chains.length < chainsCurrent.length) {
						chains = chainsCurrent
					}
					chainsCurrent = []
				}
			})
			if (chains.length < chainsCurrent.length) {
				chains = chainsCurrent
			}

			console.log(
				id +
					`<${did}>` +
					': ' +
					format(chains[0].date) +
					' - ' +
					format(chains[chains.length - 1].date) +
					` (${chains.length}d)`.padStart(6, ' ') +
					` [${chains
						.map(
							({ date, isHoli, isSand, isWekd }) =>
								`${formatD(date)}${isSand ? sandSign : ''}${
									isHoli ? holiSign : ''
								}${isWekd ? wekdSign : ''}`
						)
						.join(' ')}]`
			)
		})
	}
}

main()
