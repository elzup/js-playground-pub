/* eslint-disable @typescript-eslint/no-var-requires */

// eslint-disable-next-line @typescript-eslint/naming-convention
const YouTube = require('youtube-node')

const youtube = new YouTube()
const url = process.env.YOUTUBE_CHANNEL_URL
const token = process.env.YOUTUBE_TOKEN

async function main() {
	if (url === undefined || token === undefined) {
		console.error({ url, token })
		return
	}
	const cid = url.split('/').pop() ?? ''

	youtube.setKey(token)
	youtube.getChannelById(cid, (err, data) => {
		console.log(err)
		console.log(data)
	})
}

main()
