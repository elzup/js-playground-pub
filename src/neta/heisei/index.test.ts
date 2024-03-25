import { countFinishedHeiseiDay, is31month, range, isLeapYear } from '.'

test('count', () => {
	expect(isLeapYear(2001)).toMatchInlineSnapshot(`false`)
	expect(isLeapYear(1988)).toMatchInlineSnapshot(`true`)
	expect(isLeapYear(2100)).toMatchInlineSnapshot(`false`)
	expect(isLeapYear(2000)).toMatchInlineSnapshot(`true`)

	expect(range(1, 4)).toMatchInlineSnapshot(`
[
  1,
  2,
  3,
  4,
]
`)
	expect(range(1, 1)).toMatchInlineSnapshot(`
[
  1,
]
`)

	expect(range(1, 12).map((mi) => `${mi}: ${is31month(mi)}`)).
toMatchInlineSnapshot(`
[
  "1: 1",
  "2: 0",
  "3: 1",
  "4: 0",
  "5: 1",
  "6: 0",
  "7: 1",
  "8: 1",
  "9: 0",
  "10: 1",
  "11: 0",
  "12: 1",
]
`)

	expect(countFinishedHeiseiDay(1989, 1, 1)).toMatchInlineSnapshot(`-6`)
	expect(countFinishedHeiseiDay(1989, 1, 2)).toMatchInlineSnapshot(`-5`)
	expect(countFinishedHeiseiDay(1989, 2, 1)).toMatchInlineSnapshot(`25`)
	expect(countFinishedHeiseiDay(1990, 1, 1)).toMatchInlineSnapshot(`359`)

	const total = countFinishedHeiseiDay(2019, 4, 1)
	const d = countFinishedHeiseiDay(2018, 8, 4)

	expect(total).toMatchInlineSnapshot(`11041`)
	expect(d).toMatchInlineSnapshot(`10801`)
	expect(d / total).toMatchInlineSnapshot(`0.9782628385110045`)
})
