import { readFileSync } from 'fs'

const filePath = process.argv[2]
const file = readFileSync(filePath, 'utf8')

const obj = JSON.parse(file)

console.log(`lon,lat,speed,timestamp,bus_state`)
obj.forEach((item) => {
	const { timestamp } = item

	if (!item.jsonPayload || !item.jsonPayload.gps) return

	const { gps, bus_state: busState } = item.jsonPayload
	const { lon, lat, speed } = gps[0]
	const stateLabel = busState.split('.')[1]

	// console.log(
	// 	`${-Number(lon)},${-Number(lat)},${speed},${timestamp},${stateLabel}`
	// )
	item.jsonPayload.gps.forEach(({ lon, lat, speed }) => {
		console.log(
			`${-Number(lon)},${-Number(lat)},${speed},${timestamp},${busState}`
		)
	})
})
