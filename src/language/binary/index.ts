export const packBinary = async (data) => {
	const bin = Buffer.alloc(33)

	bin.writeInt16BE(100 * data.accel.x, 0)
	bin.writeInt16BE(100 * data.accel.y, 2)
	bin.writeInt16BE(100 * data.accel.z, 4)
	bin.writeInt16BE(100 * data.magnestic.x, 6)
	bin.writeInt16BE(100 * data.magnestic.y, 8)
	bin.writeInt16BE(100 * data.magnestic.z, 10)
	bin.writeInt16BE(100 * data.gyro.x, 12)
	bin.writeInt16BE(100 * data.gyro.y, 14)
	bin.writeInt16BE(100 * data.gyro.z, 16)
	bin.writeInt16BE(100 * data.env.temperature, 18)
	bin.writeInt16BE(100 * data.env.humidity, 20)
	bin.writeInt16BE(100 * data.env.airPressure, 22)
	bin.writeFloatBE(data.gps.lat, 24)
	bin.writeFloatBE(data.gps.lng, 28)
	const flags = data.interrupt

	bin.writeInt8(flags, 32)
	// TODO
	return bin
}
