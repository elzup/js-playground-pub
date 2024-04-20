import crypto from 'crypto'

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
	modulusLength: 512,
	publicKeyEncoding: {
		type: 'spki', // SubjectPublicKeyInfo (PKCS#8形式)
		format: 'pem', // PEM形式
	},
	privateKeyEncoding: {
		type: 'pkcs8', // PrivateKeyInfo (PKCS#8形式)
		format: 'pem', // PEM形式
	},
})

function client(msg) {
	const encryptedMessage = crypto.publicEncrypt(
		publicKey,
		Buffer.from(msg, 'utf8')
	)
	return encryptedMessage.toString('base64')
}

function server(msg) {
	const encryptedMessage = Buffer.from(msg, 'base64')

	const decryptedMessage = crypto.privateDecrypt(privateKey, encryptedMessage)

	return decryptedMessage.toString('utf8')
}
const msg = client('hoge')
console.log(msg)
console.log(server(msg))
