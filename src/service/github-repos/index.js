// eslint-disable-next-line @typescript-eslint/no-var-requires, import/extensions
const data = require('./repos.json')

// const a = {
// 	data: {
// 		viewer: {
// 			repositories: {
// 				nodes: [
// 					{
// 						name: 'MagicSpelling',
// 						languages: {
// 							edges: [
// 								{
// 									size: 11651,
// 									node: {
// 										name: 'Java',
// 										color: '#b07219',
// 									},
// 								},
// 							],
// 						},
// 					},
// 				],
// 			},
// 		},
// 	},
// }

const langs = {}

data.data.viewer.repositories.nodes.forEach((repo) => {
	repo.languages.edges.forEach((lang) => {
		const { name } = lang.node

		if (langs[name] === undefined) {
			langs[name] = []
		}
		langs[name].push({ size: lang.size, repo: repo.name })
	})
})

Object.entries(langs).forEach(([lang, repos]) => {
	console.log(lang)
	const total = repos
		.map((repo) => parseInt(repo.size))
		// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
		.reduce((a, b) => a + b, 0)

	console.log(total)
	repos.sort((b, a) => a.size - b.size)
	repos.forEach((repo) => {
		console.log(repo)
	})
})
