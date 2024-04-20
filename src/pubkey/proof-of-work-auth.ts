import crypto from 'crypto'

const workByte = 4

function findBuffer(prefix) {
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

findBuffer('0000000000000000001')
