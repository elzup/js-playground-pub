import keypress from 'keypress'

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin)

// listen for the "keypress" event
process.stdin.on(
	'keypress',
	function (ch, key: false | { ctrl: boolean; name: string }) {
		console.log('got "keypress"', key)
		if (key !== false && key.ctrl && key.name === 'c') {
			process.stdin.pause()
		}
	}
)

// process.stdin.setRawMode(true)
process.stdin.resume()
