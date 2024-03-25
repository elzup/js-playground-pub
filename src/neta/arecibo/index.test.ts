const x = 'X'

const toMessage = (c: string) => {
	return (c.charCodeAt(0) - 96)
		.toString(8)
		.split('')
		.reverse()
		.map((v) =>
			parseInt(v).toString(2).padStart(3, '0').split('').reverse().join('')
		)
}

const toDot = (msg: string[][]) => {
	return msg
		.map((ds) =>
			ds
				.map((v, i) => {
					return [
						i === 0 ? x : ' ',
						...v.split('').map((v) => (v === '0' ? ' ' : x)),
					].join('')
				})
				.join('\n')
		)
		.join('\n')
}

test('works', () => {
	const message = 'cpslab'.split('').map(toMessage)

	expect(message).toMatchInlineSnapshot(`
[
  [
    "110",
  ],
  [
    "000",
    "010",
  ],
  [
    "110",
    "010",
  ],
  [
    "001",
    "100",
  ],
  [
    "100",
  ],
  [
    "010",
  ],
]
`)
	expect('\n' + toDot(message)).toMatchInlineSnapshot(`
"
XXX 
X   
  X 
XXX 
  X 
X  X
 X  
XX  
X X "
`)
})
