const config = {
	testEnvironment: 'node',
	testMatch: ['**/*.test.js', '**/*.test.ts'],
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
