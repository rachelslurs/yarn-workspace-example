const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const json = require('@rollup/plugin-json')
const postcss = require('rollup-plugin-postcss')
const reporter = require('postcss-reporter')
const cssnano = require('cssnano')
const copy = require('rollup-plugin-copy')
// const scss = require('rollup-plugin-scss')
// const { terser } = require('rollup-plugin-terser')
// const filesize = require('rollup-plugin-filesize')

module.exports = (config) => {
    const { input, name, dir, externals, displayName, isProduction } = config

    // const filesizeConfig = {
    //   showGzippedSize: true,
    //   showBrotliSize: false,
    //   showMinifiedSize: true,
    // }

    const BABEL_CONFIG_LOCATION = path.resolve(process.env.INIT_CWD, '.babelrc.js')
    
    console.log(`${ isProduction ? 'production' : 'development' } mode bundle`)

    const plugins =  [ 
        nodeResolve({
            useBuiltIns: 'entry',
            preferBuiltins: true
        }),
        json(),
        babel({
            babelHelpers: 'runtime',
            configFile: BABEL_CONFIG_LOCATION,
            exclude: [
                /node_modules/
            ]
        }),
        commonjs({
            esmExternals: true,
            requireReturnsDefault: 'auto',
            include: [
                /node_modules/
            ]
        })
        // isProduction && terser(),
        // filesize(filesizeConfig)
    ]
    console.log(plugins)
    return {
        input,
        plugins,
            external: [
            /@babel\/runtime/,
            /lodash\.once/,
            ...externals
        ],
        context: 'window',
        output: {
            dir,
            format: 'es',
            name,
            exports: 'auto',
            preserveModules: true,
            preserveModulesRoot: path.join(process.env.PROJECT_CWD, `products/${displayName}/src`)

        }
    }
}
