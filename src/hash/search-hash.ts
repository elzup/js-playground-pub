import crypto from 'crypto'
import { incstrBase90 } from '@elzup/kit/lib/incstr'

const sha256 = (s: string) => {
	return crypto.createHash('sha256').update(s).digest('hex')
}

function main() {
	const base = 'anozon'
	const searchHex = '420202'
	// anozon
	// a2o2o2

	let c = '0'

	while (true) {
		const s = `${base}:${c}`

		if (sha256(s).startsWith(searchHex)) {
			console.log(s)

			break
		}
		c = incstrBase90(c)
	}
}
main()
