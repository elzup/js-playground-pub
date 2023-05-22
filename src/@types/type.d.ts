declare module '*.json' {
	const value: unknown

	export default value
}

declare module 'js-vim-commands' {
	class VimParser {
		parse(command: string): object
	}
	export default VimParser
}

declare module 'node-tesseract'
declare module 'd3-node'
declare module 'keypress'
