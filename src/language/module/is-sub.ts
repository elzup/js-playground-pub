// console.log(
// 	'sub top-level',
// 	require.main === module,
// 	require.main?.id,
// 	module.id
// )

export function isMainInSub() {
	console.log('sub func', require.main === module, require.main?.id, module.id)
}

export function isMain(require) {
	return require.main === module
}
