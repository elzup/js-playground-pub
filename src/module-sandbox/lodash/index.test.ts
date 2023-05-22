import _ from 'lodash'

test('works', () => {
	const a = [
		{ id: 'foo', v: 100 },
		{ id: 'bar', v: 200 },
	]

	expect(_.keyBy(a, 'id')).toMatchInlineSnapshot(`
Object {
  "bar": Object {
    "id": "bar",
    "v": 200,
  },
  "foo": Object {
    "id": "foo",
    "v": 100,
  },
}
`)

	expect(_.mapKeys(a, 'id')).toMatchInlineSnapshot(`
Object {
  "bar": Object {
    "id": "bar",
    "v": 200,
  },
  "foo": Object {
    "id": "foo",
    "v": 100,
  },
}
`)
})
