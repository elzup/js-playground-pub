import fs from 'fs'
import * as plist from 'simple-plist'

const shortcutPath = '~/Library/Preferences/com.apple.symbolichotkeys.plist'
function main() {
	const data = plist.default.readFileSync(
		process.argv[2] || shortcutPath
	) as any
	console.log(process.argv[2])

	for (const [k, v] of Object.entries(data.AppleSymbolicHotKeys)) {
		console.log(k)
		console.log(v)
	}
}

main()
