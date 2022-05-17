const createRequire = require('create-require')

// this is used for anything needing to require something from inside of the package.json instead of using require.resolve and hoping for the best with pnp
module.exports = (pathToPackageJson) => createRequire(pathToPackageJson)