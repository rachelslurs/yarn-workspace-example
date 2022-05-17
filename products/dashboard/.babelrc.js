const config = require('@rachelslurs/config')

module.exports = function(api) {
    console.log(config)
    const babelConfig = config.babel(api)
    return babelConfig
}