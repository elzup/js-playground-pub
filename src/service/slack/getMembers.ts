import { readFileSync } from 'fs'
import crypto from 'crypto'
import axios from 'axios'

export const sha512Hex = (s: string, algorithm = 'sha512') =>
	crypto.createHash(algorithm).update(String(s)).digest().toString('hex')

const TOKEN = process.env.SLACK_ANOBOT_TOKEN
const SALT = process.env.SECRET_KEY_ALT

const cli = axios.create({
	baseURL: 'https://slack.com/api/',
})

cli.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`

type MemberData = {
	id: string
	profile: { display_name_normalized: string }
}
async function main() {
	const data = JSON.parse(readFileSync('data/slack-users.json', 'utf-8'))

	const users = (data.members as MemberData[])
		.map((user): { id: string; sid: string } | null => {
			const sidRegex = /\d\d[a-zA-Z][a-zA-Z]([a-zA-Z]|\d)\d\d/
			const { id } = user

			const m = sidRegex.exec(user.profile.display_name_normalized)

			if (!m) {
				console.warn(id)
				console.warn(user.profile.display_name_normalized)
				return null
			}
			const sid = m[0].toLowerCase()

			return { id, sid }
		})
		.filter((v) => v !== null)

	// users.forEach(async (user) => {
	for (const user of users) {
		if (user === null) continue
		console.log(user.id, user.sid)

		await postGenToken(user.id, user.sid)
	}
}

const makeHash = (id: string) => sha512Hex(id + SALT)

async function postGenToken(slackId: string, sid: string) {
	const {
		data: {
			channel: { id },
		},
	} = await cli.post('/conversations.open', { users: [slackId] })

	const token = `ntpr-${sid}-${makeHash(sid).substring(0, 20)}`

	await cli.post('/chat.postMessage', {
		channel: id,
		text: `userId: \`${sid}\`\ntoken: \`${token}\`\n`,
	})
}

main().then(console.log)

export default {}
