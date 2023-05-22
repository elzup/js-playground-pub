import _ from 'lodash'

const a = [
	{ id: 'aaa', other: 'foo' },
	{ id: 'bbb', other: 'foo' },
	{ id: 'aaa', other: 'foo' },
	{ id: 'ddd', other: 'foo' },
]

const res = a.reduce((p, c) => ({ ...p, [c.id]: c }), {})

console.log({ res })
console.log({ lodashRes: _.keyBy(a, 'id') })
