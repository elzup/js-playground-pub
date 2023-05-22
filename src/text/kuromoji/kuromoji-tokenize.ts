import kuromoji, { DictionaryBuilder } from 'kuromoji'

let tokenizer: DictionaryBuilder = null

kuromoji.builder({ dicPath: 'data/dict' }).build((err, buildedTokenizer) => {
	if (tokenizer !== null) return
	tokenizer = buildedTokenizer
})

export const tokenize = (text) => {
	if (tokenizer === null) {
		console.warn('tokenizer is null')
		return []
	}
	return tokenizer.tokenize(text)
}
