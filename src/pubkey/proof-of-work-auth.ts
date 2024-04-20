import crypto from 'crypto'

const progress = (current: number, total: number, hash: string) => {
	const percentage = (current / total) * 100
	process.stdout.clearLine(0)
	process.stdout.cursorTo(0)
	const bar =
		Array(Math.floor(percentage / 2))
			.fill('=')
			.join('') +
		'>'.padEnd(50 - Math.floor(percentage / 2)) +
		` ${current}/${total} ${hash.substring(0, 8)}`
	process.stdout.write(`${bar} ${percentage.toFixed(2)}%`)
}

function findBuffer(prefix = '', workByte = 4) {
	const total = 2 ** (workByte * 4) * 2
	console.log(`need ${total} steps`)
	const prefixBuffer = Buffer.from(prefix, 'hex')

	let nonce = 0
	while (true) {
		let nonceBuffer = Buffer.from(nonce.toString())
		let combinedBuffer = Buffer.concat([prefixBuffer, nonceBuffer])

		let hash = crypto.createHash('sha256').update(combinedBuffer).digest('hex')
		if (parseInt(hash.substring(0, workByte), 16) === 0) {
			console.log()
			console.log(`Found! Nonce: ${nonce}, Hash: ${hash}`)
			return nonce
		}
		if (nonce % 1000 === 0) {
			progress(nonce, total, hash)
		}

		nonce++
	}
}

findBuffer('000000000000000', 4)
findBuffer('0000000000000000002', 6)
