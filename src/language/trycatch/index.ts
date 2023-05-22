try {
	try {
		throw 'foo'
	} catch (_e) {
		console.log('anything')
	}
} catch (_e) {
	console.log('string')
}
