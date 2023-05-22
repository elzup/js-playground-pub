import fs from 'fs'

const target = `/Users/hiro/memos/kuikon.txt`

const main = async () => {
	const text = fs.readFileSync(target, 'utf8')
	const cols = text
		.trim()
		.split('\n')
		.map((v) => v.split(','))

	const res = cols.map(([ts, ...args]) => {
		return [String(new Date(Number(ts) * 1000)), ...args]
	})

	console.log(res)
}

main()
