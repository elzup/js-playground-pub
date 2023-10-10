import { Queue } from 'bullmq'

const queue = new Queue('wait')

queue.add('wait', { name: 'step1', sleep: 4000 })
queue.add('wait', { name: 'step2', sleep: 3000 })
queue.add('wait', { name: 'step3', sleep: 2000 })
