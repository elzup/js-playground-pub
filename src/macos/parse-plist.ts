import plist from 'plist'
import fs from 'fs'
import { homedir } from 'os'

const shortcutConfigPath = `${homedir()}/Library/Preferences/com.apple.symbolichotkeys.plist`

const readPlist = (path: string) => {
	const plistFileContent = fs.readFileSync(path, 'utf8')

	return plist.parse(plistFileContent)
}

function main() {
	console.log(readPlist(shortcutConfigPath))
}

main()
