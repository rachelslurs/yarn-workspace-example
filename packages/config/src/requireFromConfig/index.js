const path = require('path')
const createRequire = require('../createRequire/index')

// this is used for anything needing to require something from inside of the packages/config folder ie modules, babel plugins, etc
// it helps the node modules resolver work when we're importing the config package from another repo

module.exports = createRequire(require.resolve(path.join(process.env.PROJECT_CWD, 'packages', 'config', 'package.json')))