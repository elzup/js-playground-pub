import { incstr } from '@elzup/kit/lib/incstr'
import fetch from 'node-fetch'

const host = '192.168.0.1'

async function main() {
	let s = '00000000'

	const f = await fetch(host)

	if (f.status !== 401) {
	}
}
