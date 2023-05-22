import { parseCronExpression } from 'cron-schedule'

const now = new Date()

console.log(parseCronExpression('0-9 * * * * *').matchDate(now))
console.log(parseCronExpression('10-19 * * * * *').matchDate(now))
console.log(parseCronExpression('20-29 * * * * *').matchDate(now))
console.log(parseCronExpression('30-39 * * * * *').matchDate(now))
console.log(parseCronExpression('40-49 * * * * *').matchDate(now))
console.log(parseCronExpression('* * 13 * * *').matchDate(now))

const cronMatch = (cronExp: string, date: Date) =>
	parseCronExpression(cronExp).matchDate(date)

console.log(cronMatch('0-9 * * * * *', now))
console.log(cronMatch('10-19 * * * * *', now))
console.log(cronMatch('20-29 * * * * *', now))
console.log(cronMatch('30-39 * * * * *', now))
console.log(cronMatch('40-49 * * * * *', now))
console.log(cronMatch('* * 13 * * *', now))
