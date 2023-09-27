const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec))

const beep = () => process.stdout.write('\x07')

async function main() {
	for (let i = 0; i < 10; i++) {
		console.log(i)
		beep()

		await sleep(1000)
	}
}

main()
