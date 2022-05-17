const path = require('path')
const babelPath = path.resolve('./babel')
const jestConfigBase = require('./jest/jest.config.base.js')
const { environmentVars, enzyme } = require('./jest/setup')
const createRequire = require('./createRequire')
const requireFromConfig = require('./requireFromConfig')
const testUtils = require('./testUtils')
const babel = require('./babel')
const enzymeAdapter = requireFromConfig('enzyme-adapter-react-16')

module.exports = {
    babel: (api) => babel(api),
    babelPath,
    jestConfigBase,
    createRequire,
    requireFromConfig,
    environmentVars,
    enzyme,
    enzymeAdapter,
    testUtils,
}
