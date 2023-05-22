function main() {
	const range = (i) => [...Array(i).keys()]
	const ume = (s) => s.toString(2).padEnd(16, '0')
	const paint = (s) => s.replace(/0/g, ' ').replace(/1/g, '#')
	const join = (v) => v.join('\n')
	const line = (n) => n |> ume |> paint
	const double = (i) => i * 2

	'ﮁ詃ﮇ詏讟'
		|> ((d) => Buffer.from(d, 'utf16le'))
		|> ((buf) => (i) => i |> double |> buf.readUInt16LE)
		|> ((fn) => (5 |> range).map(fn))
		|> ((t) => line |> t.map)
		|> join
		|> console.log
}

function main2() {
	'ﮁ詃ﮇ詏讟'
		|> ((d) => Buffer.from(d, 'utf16le'))
		|> ((buf) => [...Array(5).keys()].map((i) => buf.readUInt16LE(i * 2)))
		|> ((t) =>
			t
				.map((n) =>
					n.toString(2).padEnd(16, '0').replace(/0/g, ' ').replace(/1/g, '#')
				)
				.join('\n'))
		|> console.log
}

function main3() {
	const buf = Buffer.from('ﮁ詃ﮇ詏讟', 'utf16le')

	const a = [...Array(5).keys()]
	a.map((i) =>
		buf.readUInt16LE(i).toString(2).replace(/0/g, ' ').replace(/1/g, '#')
	).join('\n')
}
function main4() {
	const buf = Buffer.from('ﮁ詃ﮇ詏讟', 'utf16le')
	const _range = (n) => [...Array(n).keys()]
	const trans = (n) => n.toString(2).replace(/0/g, ' ').replace(/1/g, '#')
	_range(5)
		.map((i) => i * 2 |> buf.readUInt16LE |> trans)
		.join('\n') |> console.log
}

function main5() {
	const buf = Buffer.from('ﮁ詃ﮇ詏讟', 'utf16le')
	const _range = (n) => [...Array(n).keys()]
	const rep = (a, b) => (s) => s.replace(new RegExp(a, 'a'), b)
	const trans = (n) => n.toString(2) |> rep('0', ' ') |> rep('1', '#')
	_range(5)
		.map((i) => i * 2 |> buf.readUInt16LE |> trans)
		.join('\n') |> console.log
}

main4()
