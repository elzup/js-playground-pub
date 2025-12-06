import {
	scheduling,
	schedulingBy,
	schedulingEase,
	schedule,
} from 'interval-scheduling'

// Basic Usage
const items = [
	{ id: 'a', start: 1, end: 10 },
	{ id: 'b', start: 5, end: 15 },
	{ id: 'c', start: 10, end: 20 },
	{ id: 'd', start: 12, end: 20 },
	{ id: 'e', start: 16, end: 17 },
]

console.log('=== Basic scheduling ===')
const result = scheduling(items)
console.log(result)
// Expected: [['a', 'c'], ['b', 'e'], ['d']]

console.log('\n=== schedulingEase ===')
const easeResult = schedulingEase(items)
console.log(easeResult)

console.log('\n=== schedule with metadata ===')
const scheduleResult = schedule(items)
console.log(scheduleResult)

// Custom Objects
console.log('\n=== schedulingBy with custom objects ===')
const meetings = [
	{ title: 'Meeting A', startTime: 0, endTime: 10 },
	{ title: 'Meeting B', startTime: 5, endTime: 15 },
	{ title: 'Meeting C', startTime: 12, endTime: 20 },
]

const meetingResult = schedulingBy(meetings, (m) => ({
	id: m.title,
	start: m.startTime,
	end: m.endTime,
}))
console.log(meetingResult)
