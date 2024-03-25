const funcA = (v1, v2) => {
	return v1 + (Boolean(v2) ? v2 : 0)
}

// @ts-ignore
const funcB = (a) => funcA(a)
// @ts-ignore
const funcC = (...a) => funcA(...a)

const f = (callback) => {
	return callback({ left: 'pen', right: 'apple' }, null, 2)
}

test('works', () => {
	// @ts-ignore
	expect(funcA(1)).toMatchInlineSnapshot(`1`)
	// @ts-ignore
	expect(funcB(1)).toMatchInlineSnapshot(`1`)
	// @ts-ignore
	expect(funcA(1, 100)).toMatchInlineSnapshot(`101`)
	// @ts-ignore
	expect(funcB(1, 100)).toMatchInlineSnapshot(`1`)
	expect(funcC(1)).toMatchInlineSnapshot(`1`)
	expect(funcC(1, 100)).toMatchInlineSnapshot(`101`)

	expect(f((a) => JSON.stringify(a))).toMatchInlineSnapshot(
		`"{\\"left\\":\\"pen\\",\\"right\\":\\"apple\\"}"`
	)
	expect(f(JSON.stringify)).toMatchInlineSnapshot(`
		"{
		  \\"left\\": \\"pen\\",
		  \\"right\\": \\"apple\\"
		}"
	`)
	expect(f((...a) => JSON.stringify(a))).toMatchInlineSnapshot(
		`"[{\\"left\\":\\"pen\\",\\"right\\":\\"apple\\"},null,2]"`
	)
})

type Params = Partial<{
	a: number
	b: number
	c: number
	d: number
	e: number
	f: number
	g: number
	h: number
}>

test('object default arg', () => {
	expect((() => ({}))()).toMatchInlineSnapshot(`Object {}`)

	const objFunc = (
		{ a, b, c, d, e = 1, f = 1, g = 1, h = 1 }: Params = {
			// a,
			// b,
			c: 2,
			d: 2,
			// e,
			// f,
			g: 2,
			h: 2,
		}
	) => ({ a, b, c, d, e, f, g, h })

	expect(
		objFunc({
			a: 3,
			// b: 3,
			c: 3,
			// d: 3,
			e: 3,
			// f: 3,
			g: 3,
			// h: 3,
		})
	).toMatchInlineSnapshot(`
		Object {
		  "a": 3,
		  "b": undefined,
		  "c": 3,
		  "d": undefined,
		  "e": 3,
		  "f": 1,
		  "g": 3,
		  "h": 1,
		}
	`)

	expect(objFunc()).toMatchInlineSnapshot(`
		Object {
		  "a": undefined,
		  "b": undefined,
		  "c": 2,
		  "d": 2,
		  "e": 1,
		  "f": 1,
		  "g": 2,
		  "h": 2,
		}
	`)
})
