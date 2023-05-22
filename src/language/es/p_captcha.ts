import fs from 'fs'
import fetch from 'node-fetch'

import tesseract from 'node-tesseract'
import cheerio from 'cheerio'

async function saveFile(url: string) {
	const res = await fetch(url)
	const dest = fs.createWriteStream('./out/tmp.png')

	res.body?.pipe(dest)
}

async function getText() {
	const response = await fetch('http://q34.ctf.katsudon.org/')

	return response.text()
}

;(async () => {
	const body = await getText()
	const $ = cheerio.load(body)
	const src = $('img').attr('src')

	if (src === undefined) return

	const capUrl = 'http://q34.ctf.katsudon.org' + src
	const id = $('[name=id]').val()
	// const challangeUrl = 'http://q34.ctf.katsudon.org/challenge'

	console.log(capUrl)
	console.log(id)
	await saveFile(capUrl)
	const res = await capture()

	console.log(res)
})()

const options = {
	l: 'deu',
	psm: 6,
	binary: '/usr/local/bin/tesseract',
}

function capture() {
	return new Promise((resolve, reject) => {
		tesseract.process('./out/tmp.png', options, (err, text: string) => {
			if (Boolean(err)) {
				reject(err)
			}
			console.log(text)
			resolve(text)
		})
	})
}
