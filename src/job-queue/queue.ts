import { Worker } from 'bullmq'

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec))

type Field = {
	name: string
	sleep: number
}

const worker = new Worker<Field>('wait', async (job) => {
	console.log(`job start: ${job.data.name}`)
	await sleep(job.data.sleep)
	console.log(`job end: ${job.data.name}`)
})

worker.on('failed', (e) => {
	if (!e) {
		console.error('error painting: ', e)
		return
	}
	const { failedReason } = e

	console.error('error painting: ', failedReason)
})
