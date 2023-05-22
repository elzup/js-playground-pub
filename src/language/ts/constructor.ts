/* eslint-disable @typescript-eslint/no-parameter-properties */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

class User {
	constructor(public id: number) {}
}

const u = new User(10)

console.log(u.id)
