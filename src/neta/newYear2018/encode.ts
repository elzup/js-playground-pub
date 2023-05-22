const bstr = `01110111000101110001010100010101011101010001011101000101000101010111011100010111`
const arr = bstr.split(/(.{8})/).filter((x) => x)

console.log(arr)

const arr2 = arr.map((t) => parseInt(t, 2).toString(16))

console.log(arr2)

const b = new Buffer(arr2.join(''), 'hex')

console.log(b)
console.log(b.toString())
console.log(b.toString('utf8'))
