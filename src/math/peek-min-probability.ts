const t0: Record<number, number> = {}

let k = 0
const total = 10000

while (k < total) {
	k++
	const t: Record<number, number> = {}

	while (true) {
		if (Object.values(t).some((v) => v >= 12)) break
		const k = Math.floor(Math.random() * 14)

		if (!t[k]) t[k] = 0
		t[k]++
	}

	const o = Object.entries(t)

	o.sort(([a, b], [c, d]) => b - d)

	const s = o[0][1]

	if (!t0[s]) t0[s] = 0
	t0[s]++
}

Object.entries(t0).forEach(([k, v]) => {
	console.log(`${k}: ${(v / total) * 100}%`)
})
