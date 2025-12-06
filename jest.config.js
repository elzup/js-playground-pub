const config = {
	testEnvironment: 'node',
	roots: ['<rootDir>/src'],
	testMatch: ['**/*.test.js', '**/*.test.ts'],
	watchman: false,
	// setupFilesAfterEnv: ['<rootDir>/src/test/utils/setup.ts'],

	testPathIgnorePatterns: [
		'<rootDir>/src/test/utils/',
		'<rootDir>/node_modules/',
		'<rootDir>/.next/',
	],

	transformIgnorePatterns: ['/node_modules/'],

	transform: {
		'.+\\.(t|j)s$': [
			'@swc/jest',
			{
				sourceMaps: true,

				module: {
					type: 'commonjs',
				},

				jsc: {
					parser: {
						syntax: 'typescript',
					},

					transform: {},
				},
			},
		],
	},
}

module.exports = config
