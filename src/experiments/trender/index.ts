export type Word = {
	word: string
	count: number
}

export type CapRecord = {
	count: number
	score: number
}

export type Captures = {
	timestamp: number
	captures: { [word: string]: CapRecord }
}

function calcScore(
	newCount: number,
	oldCount: number,
	newTime: number,
	oldTime: number
) {
	return ((newCount - oldCount) * 60000) / (newTime - oldTime)
}

export function calc(
	words: Word[],
	timestamp: number,
	oldCapture: Captures
): Captures {
	const newCaptures: Captures = {
		timestamp,
		captures: {},
	}

	words.forEach((doc) => {
		const cap = oldCapture.captures[doc.word]

		if (cap === undefined) {
			newCaptures.captures[doc.word] = {
				count: doc.count,
				score: 0,
			}
			return
		}
		newCaptures.captures[doc.word] = {
			count: doc.count,
			score: calcScore(doc.count, cap.count, timestamp, oldCapture.timestamp),
		}
	})
	return newCaptures
}
