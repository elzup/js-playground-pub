import Table from 'cli-table'
import data from '../../../data/ff.json'

const table = new Table({
	head: ['', 'ff', 'fn', 'nf'],
	colWidths: [...Array(4).keys()].map(() => 20),
})

const ps = ['ff', 'fn', 'nf'] as const

const main = async () => {
	const lines = ps.map((p1) => [
		p1,
		...ps.map((p2) => data[p1][p2].map((v) => v.screen_name).join('\n')),
	])

	console.log(lines)
	table.push(...lines)
	console.log(table.toString())
}

main()
