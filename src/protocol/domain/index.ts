import fs from 'fs'
import _ from 'lodash'

const text = fs.readFileSync(__dirname + '/domains.txt', 'utf8')
const res = text
	.trim()
	.split('\n')
	.map((line) => {
		const m = line.match(/^(.*) - \$(.*)$/)

		if (!m) {
			return null
		}
		const [, domain, priceStr] = m
		const price = parseInt(priceStr, 10)

		return { domain, price }
	})
const domains = _.compact(res)

console.log(
	_.sortBy(domains, 'price')
		.map((v) => `${v.domain} - $${v.price}`)
		.join('\n')
)
