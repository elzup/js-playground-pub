import { split4Int32 } from './utils'

test('count', () => {
	expect(split4Int32('fff0bdc0001b1598ffbec4c8ffec8b88')).
toMatchInlineSnapshot(`
[
  812.017254,
  1647.33911,
  1684.156518,
  1667.52312,
]
`)
})
