const path = require('path')

module.exports = {
    automock: false,
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: '<rootDir>/coverage/',
    coveragePathIgnorePatterns: [
        '.yarn/',
        'commitlint.config.js',
        'babel.config.js',
        '.babelrc.js',
        'env.js',
        'jest.config.js',
        '/pages/',
        '/styles/',
        'coverage',
        '/dist/',
        '.jest/'
    ],
    // The maximum amount of workers used to run your tests.
    maxWorkers: '80%',
    // A number limiting the number of tests that are allowed to run at the same time when using test.concurrent. Any test above this limit will be queued and executed once a slot is released.
    maxConcurrency: 10,
    moduleFileExtensions: [
        'js',
        'json'
    ],
    moduleNameMapper: {
        '\\.module.scss$': require.resolve('identity-obj-proxy'),
        '^.+\\.(css|less|scss)$': require.resolve('identity-obj-proxy')
    },
    resetMocks: true,
    resetModules: true,
    setupFiles: [
        path.join(__dirname, 'setup/environmentVars.js'),
        // require('leaked-handles')
    ],
    setupFilesAfterEnv: [
        path.join(__dirname, 'setup/enzyme.js')
    ],
    snapshotSerializers: [
        require.resolve('enzyme-to-json/serializer')
    ],
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: [
        '<rootDir>/.yarn'
    ],
    transform: {
        '\\.js$': [
            require.resolve('babel-jest'), { 
                rootMode: 'upward'
            }
        ]
    },
    verbose: true,
}