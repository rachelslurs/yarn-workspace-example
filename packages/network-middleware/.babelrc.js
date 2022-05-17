const config = require('@rachelslurs/config')

module.exports = function(api) {
    const babelConfig = config.babel(api)
    return babelConfig
}
