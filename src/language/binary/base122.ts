import utf8 from 'utf8'
import base64 from 'base-64'

function base64Decode(text: string) {
	const bytes = base64.decode(text)

	return utf8.decode(bytes)
}

const encoded = '44G744GSCg=='

console.log(base64Decode(encoded))
