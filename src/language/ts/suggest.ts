type State = { loaded: false } | { loaded: true; data: string }

function _ng() {
	const state: State = { loaded: false }

	if (state.loaded) {
		// state.data // error!
	}
}

function _ok() {
	const state = { loaded: false } as State

	if (state.loaded) {
		console.log(state.data)
	}
}
