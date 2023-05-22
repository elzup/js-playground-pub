import { graphql, GraphQlQueryResponseData } from '@octokit/graphql'

type Edge = {
	node: {
		login
		contributionsCollection: { totalCommitContributions: number }
	}
}

const cli = graphql.defaults({
	headers: {
		authorization: process.env.GITHUB_TOKEN,
	},
})
const getMembers = (org, after): GraphQlQueryResponseData => {
	return cli(
		`
		query ($org: String!, $after: String) {
			organization(login: $org) {
				membersWithRole(first: 50, after: $after) {
					pageInfo {
						endCursor
					}
					edges {
						node {
							login
							contributionsCollection {
								totalCommitContributions
							}
						}
					}
				}
			}
		}
	`,
		after !== '' ? { org, after } : { org }
	)
}

async function main(org: string) {
	const edges: Edge[] = []

	let next = ''

	while (true) {
		const res = await getMembers(org, next)

		const {
			data: {
				organization: {
					membersWithRole: {
						pageInfo: { endCursor },
						edges: newEdges,
					},
				},
			},
		} = res

		if (edges.length === 0) {
			break
		}
		edges.push(...(newEdges as Edge[]))
		next = endCursor
	}

	const users = edges.map(
		(e) =>
			[
				e.node.login,
				e.node.contributionsCollection.totalCommitContributions,
			] as const
	)

	users.sort(([v, a], [_, b]) => b - a)

	// top 30
	for (let i = 0; i < 30; i++) {
		const [id, num] = users[i]

		console.log(`${id}: ${num} https://github.com/${id}`)
	}
}
main(process.argv0)
