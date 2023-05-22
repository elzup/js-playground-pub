import { timeConvert } from './time-convert'

test('time-convert', () => {
	expect(timeConvert({ sec: 4000000000 ** 2 })).toMatchInlineSnapshot(`
		Object {
		  "allSec": 16000000000000000000,
		  "divs": Object {
		    "day": 25,
		    "hou": 4,
		    "min": 26,
		    "mth": 2,
		    "sec": 40,
		    "yrs": 507356671740,
		  },
		}
	`)
})
