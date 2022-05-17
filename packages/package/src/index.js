const configFactory = require('./rollup.config.js')
const path = require('path')

module.exports = () => {
    try {
        const PACKAGE_ROOT_PATH = process.env.INIT_CWD
        const PACKAGE_JSON_PATH = path.join(PACKAGE_ROOT_PATH, 'package.json')
        const PACKAGE_JSON = require(PACKAGE_JSON_PATH)

        const externals = Object.keys(PACKAGE_JSON.peerDependencies || {})
        const displayName = PACKAGE_JSON.displayName
        
        return configFactory({
            input: `${PACKAGE_ROOT_PATH}/src`,
            dir:  `${PACKAGE_ROOT_PATH}/dist`,
            name: PACKAGE_JSON.name,
            main: PACKAGE_JSON.main || null,
            module: PACKAGE_JSON.module || null,
            scss: PACKAGE_JSON.scss || null,
            externals,
            displayName,
            isProduct: PACKAGE_ROOT_PATH.includes('/products/'),
            isProduction: process.env.NODE_ENV === 'production',
            PACKAGE_JSON_PATH
        })
    } catch (error) {  
        console.error(error) 
        throw error
    }
}