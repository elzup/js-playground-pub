import _ from 'lodash'

export const update = (state, { liveId, logs }) => {
	// HACKME
	return {
		...state,
		[liveId]: {
			...state[liveId],
			..._.keyBy(logs, 'id'),
		},
	}
}

const state = {
	'#1': {
		'10:01': { id: '10:01' },
		'10:02': { id: '10:02' },
		'10:03': { id: '10:03' },
		'10:04': { id: '10:04' },
	},
}
const state2 = {
	'#1': {
		'10:04': { id: '10:04' },
		'10:05': { id: '10:05' },
	},
}

test('assign', () => {
	expect(
update(state, {
  liveId: '#1',
  logs: [
  {
    id: '10:04'
  },
  {
    id: '10:05'
  }]

})
).toMatchInlineSnapshot(`
{
  "#1": {
    "10:01": {
      "id": "10:01",
    },
    "10:02": {
      "id": "10:02",
    },
    "10:03": {
      "id": "10:03",
    },
    "10:04": {
      "id": "10:04",
    },
    "10:05": {
      "id": "10:05",
    },
  },
}
`)

	expect(_.merge(state, state2)).toMatchInlineSnapshot(`
{
  "#1": {
    "10:01": {
      "id": "10:01",
    },
    "10:02": {
      "id": "10:02",
    },
    "10:03": {
      "id": "10:03",
    },
    "10:04": {
      "id": "10:04",
    },
    "10:05": {
      "id": "10:05",
    },
  },
}
`)
	expect(_.extend(state, state2)).toMatchInlineSnapshot(`
{
  "#1": {
    "10:04": {
      "id": "10:04",
    },
    "10:05": {
      "id": "10:05",
    },
  },
}
`)
	expect(_.assign(state, state2)).toMatchInlineSnapshot(`
{
  "#1": {
    "10:04": {
      "id": "10:04",
    },
    "10:05": {
      "id": "10:05",
    },
  },
}
`)
})
