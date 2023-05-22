const secSec = 1
const minSec = 60 * secSec
const houSec = 60 * minSec
const daySec = 24 * houSec
const mthSec = 30 * daySec
const yrsSec = 365 * daySec

const pick = (sec: number, parent: number, cur: number) =>
	Math.floor((sec % parent) / cur)
const recoPick = (parent: number, cur: number) => (sec) =>
	pick(sec, parent, cur)
const pickYrs = recoPick(Infinity, yrsSec)
const pickMth = recoPick(yrsSec, mthSec)
const pickDay = recoPick(mthSec, daySec)
const pickHou = recoPick(daySec, houSec)
const pickMin = recoPick(houSec, minSec)
const pickSec = recoPick(minSec, secSec)

export const timeConvert = ({
	yrs = 0,
	mth = 0,
	day = 0,
	hou = 0,
	min = 0,
	sec = 0,
}) => {
	const allSec =
		yrs * yrsSec +
		mth * mthSec +
		day * daySec +
		hou * houSec +
		min * minSec +
		sec

	return {
		allSec,
		divs: {
			yrs: pickYrs(allSec),
			mth: pickMth(allSec),
			day: pickDay(allSec),
			hou: pickHou(allSec),
			min: pickMin(allSec),
			sec: pickSec(allSec),
		},
	}
}

// console.log(timeConvert({ sec: 4_0000_0000 ** 2 }))
