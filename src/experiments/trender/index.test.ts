import { calc, Word, Captures } from '.'

test('works', () => {
	const currentWords: Word[] = [
		{
			word: 'apple',
			count: 100,
		},
		{
			word: 'bob',
			count: 51,
		},
		{
			word: 'cookie',
			count: 500,
		},
	]
	const oldCaptures: Captures = {
		timestamp: 1000,
		captures: {
			apple: {
				count: 50,
				score: 0,
			},
			bob: {
				count: 50,
				score: 0,
			},
		},
	}

	expect(calc(currentWords, 61000, oldCaptures)).toMatchInlineSnapshot(`
		Object {
		  "captures": Object {
		    "apple": Object {
		      "count": 100,
		      "score": 50,
		    },
		    "bob": Object {
		      "count": 51,
		      "score": 1,
		    },
		    "cookie": Object {
		      "count": 500,
		      "score": 0,
		    },
		  },
		  "timestamp": 61000,
		}
	`)
	// cached new
	// caled
	// older deleted
})
