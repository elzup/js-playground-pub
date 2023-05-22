import _ from 'lodash'

import res from '../../../data/users-lookup-res.json'
import namesData from '../../../data/names.json'

const namesAll = namesData.names.split(',')

const nameDict: { [name: string]: boolean } = namesAll.reduce(
	(p, c) => Object.assign(p, { [c]: true }),
	{}
)

res.forEach((user) => {
	nameDict[user.screen_name.toLowerCase()] = false
})

const usableNames = _.compact(_.map(nameDict, (v, k) => (v ? k : null))).sort(
	(a, b) => a.localeCompare(b)
)

console.log(JSON.stringify(usableNames))
