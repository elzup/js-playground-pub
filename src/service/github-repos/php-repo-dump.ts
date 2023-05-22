import data from '../../../data/php_repos.json'

type LangEdge = {
	size: number
	node: {
		name: string
		color: '#4F5D95'
	}
}
type Repo = {
	name: string
	size: number
	languages: {
		edges: LangEdge[]
	}
}

const phpLang = (edges: LangEdge[]) => edges.find((e) => e.node.name === 'PHP')
const phpRepoSize = (repo: Repo): number =>
	phpLang(repo.languages.edges)?.size ?? 0

const repos = (data as Repo[]).map((v) => ({ ...v, size: phpRepoSize(v) }))
const total = repos.map((v) => v.size).reduce((a, b) => a + b, 0)

repos.sort((a, b) => a.size - b.size)
repos.forEach((repo) => {
	console.log(repo.name, repo.size, `${repo.size / total}%`)
})
