function main() {
	const bigs = `
##### ###      #
#   # #  #    ##
##### ###    ###
#   # #  #  ####
#   # ###  #####
`.trim()

	const lines = bigs.split('\n')
	const nums = lines.map((line) =>
		parseInt(line.replace(/ /g, '0').replace(/#/g, '1'), 2)
	)

	console.log(nums)

	const intBuf = Buffer.from(new Uint16Array(nums).buffer)

	console.log(intBuf.toString('utf8'))
	console.log(intBuf.toString('base64'))
	console.log(intBuf.toString('utf16le'))
}

main()

export default {}
