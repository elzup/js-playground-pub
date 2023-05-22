import Jimp from 'jimp'

const main = async () => {
	const image = await new Jimp(100, 100, 0xffffffff)

	await image.write('out/img100.png')
}

main()
