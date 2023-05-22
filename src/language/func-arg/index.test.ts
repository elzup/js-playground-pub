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
