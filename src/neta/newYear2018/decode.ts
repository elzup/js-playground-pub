const _2018 = [...Buffer.from('᝷ᔕ᝵ᕅ᝷', 'utf16le')]
	.map((e, i) => {
		const n = e.toString(2)

		return '00000000'.substr(n.length) + n + ['', '\n'][i & 1]
	})
	.join('')
	.replace(/0/g, ' ')
	.replace(/1/g, '%')

console.log(_2018)
