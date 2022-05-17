const config = require('@rachelslurs/config')
const packageJson = require('./package.json')

module.exports = {
    ...config.jestConfigBase,
    displayName: packageJson.displayName,
    name: packageJson.name
}
