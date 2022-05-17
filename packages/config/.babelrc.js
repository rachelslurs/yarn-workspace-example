const config = require('./src')
// this is the babel config that gets run with tests:each

module.exports = function(api) {
    // console.log('api inside', api)
    const babelConfig = config.babel(api)
    return babelConfig
}