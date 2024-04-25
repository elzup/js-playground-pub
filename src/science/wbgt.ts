const isWinter = (month: number): boolean => [12, 1, 2].includes(month)
const isSummer = (month: number): boolean => [6, 7, 8].includes(month)
const isTemperatureComfortable = (temp: number): boolean =>
	temp >= 18 && temp <= 28
const isHumidityComfortable = (humid: number): boolean =>
	humid >= 30 && humid <= 70

const conditions: { cond: (...args: number[]) => boolean; score: number }[] = [
	{
		cond: (humid: number, temp: number) =>
			!isTemperatureComfortable(temp) || !isHumidityComfortable(humid),
		score: -1,
	},
	{
		cond: (humid: number, temp: number) => temp < 5 || temp > 30,
		score: -0.5,
	},
	{
		cond: (humid: number, temp: number) => humid < 30 || humid > 80,
		score: -0.5,
	},
	{
		cond: (
			outdoorHumid: number,
			outdoorTemp: number,
			indoorHumid: number,
			indoorTemp: number
		) => Math.abs(indoorTemp - outdoorTemp) > 10,
		score: -0.5,
	},
	{
		cond: (
			outdoorHumid: number,
			outdoorTemp: number,
			indoorHumid: number,
			indoorTemp: number
		) => Math.abs(indoorHumid - outdoorHumid) > 20,
		score: -0.5,
	},
]

const evaluateComfort = (
	outdoorTemp: number,
	outdoorHumid: number,
	indoorTemp: number,
	indoorHumid: number,
	month: number
) => {
	let comfortScore = 3

	if (isWinter(month)) {
		comfortScore -= 0.5
	} else if (isSummer(month)) {
		comfortScore += 0.5
	}

	conditions.forEach((condition) => {
		if (condition.cond(outdoorHumid, outdoorTemp, indoorHumid, indoorTemp)) {
			comfortScore += condition.score
		}
	})

	return Math.max(1, Math.min(5, Math.round(comfortScore)))
}

const condPoint = (tmp: number, hmd: number): number =>
	Math.round(0.81 * tmp + 0.01 * hmd * (0.99 * tmp - 14.3) + 46.3)

const rules = [
	{ range: [-Infinity, 55], point: 1, name: '寒い', good: 3 },
	{ range: [0, 70], point: 2, name: '肌寒い', good: 2 },
	{ range: [70, 75], point: 3, name: '快適', good: 1 },
	{ range: [75, 80], point: 4, name: 'やや暑い', good: 2 },
	{ range: [80, 85], point: 5, name: '暑い', good: 2 },
	{ range: [85, Infinity], point: 6, name: 'とても暑い', good: 3 },
]

export const evaluateCondition = (tmp: number, hmd: number) => {
	const point = condPoint(tmp, hmd)
	const cond = rules.find((r) => r.range[0] <= point && point < r.range[1])
	if (!cond) {
		console.warn('No condition found for point:', point)
	}
	return {
		point,
		cond: cond || { point, name: '不明', range: [0, 0], good: 2 },
	}
}
