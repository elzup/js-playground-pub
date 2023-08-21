import { isMain } from './is-sub'

if (isMain(require)) {
	console.log('bad')
}
