import { check } from '@makenowjust-labo/redos'

console.log(check('^(a|a)+$', 'g', { timeout: 1000, checker: 'fuzz' }))

async function search() {
	const lorem = `Lorem ipsum dolor sit amet comsectetur adipiscing elit`

	// console.log(/^([^o]+)+$/.exec(lorem))
	console.log(/^([^c]+)+$/.exec(lorem))
	return 'find'
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function main() {
	const res = await Promise.race([sleep(1000), search()])

	console.log(res)
}

main()
