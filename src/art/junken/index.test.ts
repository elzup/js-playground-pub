import { junkenCheck } from '.'

test('count', () => {
	expect(junkenCheck('g', 'c')).toMatchInlineSnapshot(`"wins"`)
	expect(junkenCheck('c', 'c')).toMatchInlineSnapshot(`"draw"`)
	expect(junkenCheck('p', 'c')).toMatchInlineSnapshot(`"lose"`)
	expect(junkenCheck('c', 'p')).toMatchInlineSnapshot(`"wins"`)
})
