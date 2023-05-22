import _ from 'lodash'
import client from './client'
import { FF, User } from './types'

const compUser = (u: User): User =>
	_.pick(u, ['id', 'name', 'screen_name', 'profile_image_url_https'])

const genCrawlUsers = (endpoint: string) => {
	return async (screenName: string): Promise<User[]> => {
		let cursor = -1
		const users: User[] = []

		do {
			const res = await client
				.get(endpoint, {
					screen_name: screenName,
					cursor,
					count: 200,
				})
				.catch((e) => {
					console.error(e)
					return false as const
				})

			if (res === false) break

			Array.prototype.push.apply(users, res.users)
			cursor = res.next_cursor
		} while (cursor > 0)
		return users.map(compUser)
	}
}

const getFollowers = genCrawlUsers('followers/list')
const getFriends = genCrawlUsers('friends/list')

const getFf = async (name: string): Promise<FF> => {
	const followers = await getFollowers(name)
	const friends = await getFriends(name)

	// 相互
	// follow and followed
	const ff = _.intersectionBy(followers, friends, 'id')

	// 片思い
	// follow but followbacked
	const fn = _.differenceBy(friends, followers, 'id')

	// 片思われ
	// not following but followed
	const nf = _.differenceBy(followers, friends, 'id')
	const all = _.uniqBy(friends.concat(followers), 'id')

	return { ff, fn, nf, nn: [], all }
}

export type Result = {
	ff: FF
	fn: FF
	nf: FF
	nn: FF
}

const calcCross = (ff1: FF, ff2: FF): Result => {
	ff1.nn = _.differenceBy(ff2.all, ff1.all)
	ff2.nn = _.differenceBy(ff1.all, ff2.all)
	const res: Result = {
		ff: { ff: [], fn: [], nf: [], nn: [], all: [] },
		fn: { ff: [], fn: [], nf: [], nn: [], all: [] },
		nf: { ff: [], fn: [], nf: [], nn: [], all: [] },
		nn: { ff: [], fn: [], nf: [], nn: [], all: [] },
	}
	const ps = ['ff', 'fn', 'nf', 'nn'] as const

	ps.forEach((p1) => {
		ps.forEach((p2) => {
			res[p1][p2] = _.intersectionBy(ff1[p1], ff2[p2], 'id')
		})
	})
	return res
}

const main = async () => {
	const name1 = 'anozon'
	const name2 = '_elzup_'
	const ff1 = await getFf(name1)
	const ff2 = await getFf(name2)
	const res = calcCross(ff1, ff2)

	console.log(JSON.stringify(res, null, '\t'))
}

main()
