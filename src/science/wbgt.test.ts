import { evaluateCondition } from './wbgt'

it('wbgt', () => {
	expect(evaluateCondition(20, 50)).toMatchInlineSnapshot(`
{
  "cond": {
    "good": 2,
    "name": "肌寒い",
    "point": 2,
    "range": [
      0,
      70,
    ],
  },
  "point": 65,
}
`)
	expect(evaluateCondition(30, 50)).toMatchInlineSnapshot(`
{
  "cond": {
    "good": 2,
    "name": "やや暑い",
    "point": 4,
    "range": [
      75,
      80,
    ],
  },
  "point": 78,
}
`)
	expect(evaluateCondition(30, 90)).toMatchInlineSnapshot(`
{
  "cond": {
    "good": 2,
    "name": "暑い",
    "point": 5,
    "range": [
      80,
      85,
    ],
  },
  "point": 84,
}
`)
	expect(evaluateCondition(10, 30)).toMatchInlineSnapshot(`
{
  "cond": {
    "good": 3,
    "name": "寒い",
    "point": 1,
    "range": [
      -Infinity,
      55,
    ],
  },
  "point": 53,
}
`)
})
