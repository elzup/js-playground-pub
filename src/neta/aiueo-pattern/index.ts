import _ from 'lodash'

const patterns = (() => {
	const aiueo = 'aiueo'.split('')

	return _.flatten(aiueo.map((a) => aiueo.map((b) => a + b)))
})()

type CountResult = {
	[id: string]: number
}
function calcCount(text: string): CountResult {
	const ta = text.split('')
	const counts: Record<string, number> = patterns.reduce(
		(p, c) => ({ ...p, [c]: 0 }),
		{}
	)

	for (let i = 0; i + 1 < ta.length; i++) {
		const unit = ta[i] + ta[i + 1]

		counts[unit]++
	}
	return counts
}
console.log(calcCount('aaiiuueeoaoaeiueoaoaiueo'))
console.log(calcCount('aaiauaeaoiiuieiouueuoeeooa'))
console.log(calcCount('aiiueoauuoieaeeiouaooeuia'))
