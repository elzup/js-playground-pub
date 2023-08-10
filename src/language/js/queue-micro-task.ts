let failCount = 0
const fire = async (onError: () => void) => {
	onError()
}

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec))

async function main() {
	function task() {
		fire(async () => {
			failCount++
			const sleepTimeSec = Math.min(10, 2 ** failCount)

			// console.log(`{failCount}:${sleepTimeSec}ms)`)
			await sleep(sleepTimeSec)

			task()
			// queueMicrotask(task)
		})
	}
	task()
}

if (!module.parent) {
	main()
}

export default {}
