type Hand = 'g' | 'c' | 'p'
type Judge = 'wins' | 'lose' | 'draw'

const allHands: Hand[] = ['g', 'c', 'p']
const allResult: Judge[] = ['wins', 'lose', 'draw']

function sample<T>(a: T[]): T {
	return a[Math.floor(Math.random() * a.length)]
}

export const cpuJunkenGame = (_hand: Hand): Judge => sample(allResult)

const lib: Record<Hand, Record<Hand, Judge>> = {
	g: { g: 'draw', c: 'wins', p: 'lose' },
	c: { g: 'lose', c: 'draw', p: 'wins' },
	p: { g: 'wins', c: 'lose', p: 'draw' },
}

// it return hand1 JUDGE hand2

export const junkenCheck = (hand1: Hand, hand2: Hand): Judge => {
	return lib[hand1][hand2]
}

export const game = (hand: Hand): Judge => {
	if (!(hand in allHands)) {
		throw new Error(`Expected a 'g' or 'c' or 'p', got ${typeof hand}`)
	}
	const enemyHand = sample(allHands)
	const res = junkenCheck(hand, enemyHand)

	return res
}
