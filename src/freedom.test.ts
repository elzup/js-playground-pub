const hello = (...args: unknown[]) => {
	return args
}

const a = [
	{ id: 'aaa', other: 'foo' },
	{ id: 'bbb', other: 'foo' },
	{ id: 'ccc', other: 'foo' },
	{ id: 'ddd', other: 'foo' },
]

const res = a.reduce((p, c) => {
	const v = { ...p, [c.id]: c }

	return v
}, {})

// console.log({ res })

test('works', () => {
	expect(hello(10)).toMatchInlineSnapshot(`
Array [
  10,
]
`)
	expect(hello(10, 20)).toMatchInlineSnapshot(`
Array [
  10,
  20,
]
`)
	expect(hello(10, ...[])).toMatchInlineSnapshot(`
Array [
  10,
]
`)
})

export default {}
