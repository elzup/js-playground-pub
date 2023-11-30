import { readFile } from 'fs/promises'
import { diffChars } from 'diff'

const replacements = {
	a: 'A',
}

const kanaToHiragana = (str) =>
	str.replace(/[\u30A1-\u30F6]/g, (match) =>
		String.fromCharCode(match.charCodeAt(0) - 0x60)
	)

const zenkakuToHankaku = (str) =>
	str
		.replace(/[\uff01-\uff5e]/g, (ch) =>
			String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
		)
		.replace(/\u3000/g, ' ')

const normalizeNumbers = (str: string) =>
	str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
const normalize = (s: string) =>
	Object.entries(replacements).reduce(
		(acc, [key, value]) => acc.replaceAll(key, value),
		zenkakuToHankaku(normalizeNumbers(kanaToHiragana(s)))
			.toLowerCase()
			.replace(/[、。／/・　 「」?]/g, '')
	)

function calculateDiffAndExtractChanges(s1: string, s2: string) {
	const diffResult = diffChars(normalize(s1), normalize(s2))

	let diffScore = 0
	let changes = ''

	diffResult.forEach((part) => {
		if (part.added ?? false) {
			changes += '+' + part.value
			diffScore += part.count ?? 0
		} else if (part.removed ?? false) {
			changes += '-' + part.value
			diffScore += part.count ?? 0
		} else {
			changes += '.'.repeat(Math.log2(part.count ?? 0))
		}
	})

	return { diffScore, changes }
}

async function main() {
	const a = await readFile('./data/diff-a.txt', 'utf-8')
	const b = await readFile('./data/diff-b.txt', 'utf-8')

	const valsA = a.trim().split('\n')
	const valsB = b.trim().split('\n')

	for (let i = 0; i < valsA.length; i++) {
		const { diffScore, changes } = calculateDiffAndExtractChanges(
			valsA[i],
			valsB[i]
		)

		// if (diffScore > 0) {
		console.log(diffScore + '\t' + changes)
		// }
	}
}

main()
