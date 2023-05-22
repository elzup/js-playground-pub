export const split4Int32 = (hexstr: string): number[] => {
	const bin = Buffer.from(hexstr)

	return [...Array(4).keys()].map((i) => bin.readInt32LE(i) / 1000000)
}
