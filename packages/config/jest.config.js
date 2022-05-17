const config = require('./src/index')
const packageJson = require('./package.json')

module.exports = {
    ...config.jestConfigBase,
    displayName: packageJson.displayName,
    name: packageJson.name
}