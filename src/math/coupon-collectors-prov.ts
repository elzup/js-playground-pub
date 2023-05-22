// 期待値, この問題は、クーポンコレクターの問題、コンプガチャ

const N = 28
const M = 9

function fomula(N: number, M: number) {
	function coupon(n: number): number {
		let sum = 0

		for (let i = 1; i <= n; i++) {
			sum += 1 / i
		}
		return sum
	}

	const res: number[] = []

	for (let i = 0; i < M; i++) {
		res.push(coupon(N - i) * (M - i))
	}

	return res.reduce((a, b) => a + b, 0) * N
}
function simulate(N: number, M: number) {
	const res: number[] = []

	for (let i = 0; i < 1000; i++) {
		const got = {}
		let comp = 0

		let i = 0

		for (i = 0; comp < N; i++) {
			const p = Math.floor(Math.random() * N)

			got[p] = (got[p] ?? 0) + 1
			if (got[p] === M) comp += 1
		}
		res.push(i)
	}
	return res.reduce((a, b) => a + b, 0) / res.length
}

// console.log(`n=${N}, mul=${M}`)

// console.log(`- fomula`)
// console.log(`cv*mul=${fomula(N, M)}`)
// console.log(`- simulate`)
// console.log(`i=${simulate(N, M)}`)

function matrix() {
	const res: number[][] = []

	for (let i = 0; i < 10; i++) {
		res[i] = res[i] ?? []
		for (let j = 0; j < 10; j++) {
			res[i][j] = simulate(i + 1, j + 1)
		}
	}
	console.log('-,' + (res[0] ?? []).map((_, i) => i).join(','))
	console.log(res.map((row, j) => `${j},` + row.join(',')).join('\n'))
}
matrix()
