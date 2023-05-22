import crypto from 'crypto'

function decrypt(algorithm, password, salt, iv, encryptedData) {
	// 鍵を生成
	const key = crypto.scryptSync(password, salt, 32)

	// 復号器を生成
	const decipher = crypto.createDecipheriv(algorithm, key, iv)

	// encryptedData を復号
	let decryptedData = decipher.update(encryptedData)

	decryptedData = Buffer.concat([decryptedData, decipher.final()])

	return decryptedData
}

const encrypted = 'xp9fTycxm1JZtSpE9BndpMXtbKvs/+bv7vEqNOn6uno='
const iv = Buffer.from('00000000000000000000000000000000', 'ascii')

console.log(
	decrypt(
		'aes-256-cbc',
		'0000000000000000000000000000000000000000000000000000000000000000',
		'',
		iv,
		encrypted
	)
)
