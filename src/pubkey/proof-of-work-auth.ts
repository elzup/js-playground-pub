import crypto from 'crypto'

function findBuffer(prefix = '', workByte = 4) {
	console.log(`need ${2 ** (workByte * 4)} steps`)
	const prefixBuffer = Buffer.from(prefix, 'hex')

	let nonce = 0
	while (true) {
		let nonceBuffer = Buffer.from(nonce.toString())
		let combinedBuffer = Buffer.concat([prefixBuffer, nonceBuffer])

		let hash = crypto.createHash('sha256').update(combinedBuffer).digest('hex')
		if (parseInt(hash.substring(0, workByte), 16) === 0) {
			console.log(`Found! Nonce: ${nonce}, Hash: ${hash}`)
			return nonce
		}

		nonce++
	}
}

findBuffer('0000000000000000002', 6)
