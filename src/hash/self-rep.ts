import crypto from 'crypto'
import { incstr } from '@elzup/kit/lib/incstr'

const sha256 = (s: string) =>
	crypto.createHash('sha256').update(Buffer.from(s, 'hex')).digest('hex')

function main() {
	let c = '0'
	// ascii repeat

	for (let i = 0; i < 1000000000; i++) {
		if (sha256(c).startsWith(c)) {
			console.log(c)
		}

		c = incstr(c, 1, '0123456789abcdef')
		if (c.length % 2 === 1) c = c + '0'
	}
}
main()
