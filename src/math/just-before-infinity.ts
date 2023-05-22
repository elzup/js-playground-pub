let h = 100
let l = 500

for (let i = 0; i < 100; i++) {
	const vn = (h + l) / 2

	if (Math.pow(10, 308.254715559916718) + Math.pow(10, vn) === Infinity) {
		h = vn
	} else {
		l = vn
	}
	console.log(vn)
}
