const p = (k) => (v) => v[k]

const a = [{ foo: 'a' }, { foo: 'b' }, { foo: 'c' }]
/*
ruby
a.map(&:foo)
>
*/

console.log(a.map(p('foo')))

export {}
