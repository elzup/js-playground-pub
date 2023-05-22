const argDump = (...args) => {
	return args
}

test('works', () => {
	expect(argDump(0, 1)).toMatchInlineSnapshot(`
Array [
  0,
  1,
]
`)

	expect(argDump(0, ...[10, 11])).toMatchInlineSnapshot(`
Array [
  0,
  10,
  11,
]
`)

	expect(argDump(0, ...[])).toMatchInlineSnapshot(`
Array [
  0,
]
`)
})
