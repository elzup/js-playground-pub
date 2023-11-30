import { readFile } from 'fs/promises'
import { diffChars } from 'diff'

function calculateDiffAndExtractChanges(s1: string, s2: string) {
	const diffResult = diffChars(s1, s2)

	let diffScore = 0
	let changes = ''

	diffResult.forEach((part) => {
		diffScore += part.count ?? 0
		if ((part.added ?? false) || (part.removed ?? false)) {
			changes += '|' + part.value
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

		console.log(diffScore + '\t' + changes)
	}
}

main()
