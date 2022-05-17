const packageJson = require('./package.json')

module.exports = {
    displayName: packageJson.displayName,
    name: packageJson.name,
    passWithNoTests: true
}