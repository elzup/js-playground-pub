import VimParser from 'js-vim-commands'

const parser = new VimParser()

const res = parser.parse('G0jkkdw$p')

console.log(res)

export {}
