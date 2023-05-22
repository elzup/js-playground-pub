// const sleep = ms => new Promise(r => setTimeout(r, ms))
const sleep2 = (ms: number) =>
	new Promise(() =>
		setTimeout(() => {
			console.log('sleep end')
		}, ms)
	)

;(async () => {
	await sleep2(1000)
	console.log('end')
})()
