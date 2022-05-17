const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const json = require('@rollup/plugin-json')
const postcss = require('rollup-plugin-postcss')
const reporter = require('postcss-reporter')
const cssnano = require('cssnano')
const copy = require('rollup-plugin-copy')
// const shakeablePostCss = require('rollup-plugin-postcss-treeshakeable') //https://github.com/dferber90/rollup-plugin-postcss-treeshakeable/blob/master/example/README.md
// const scss = require('rollup-plugin-scss')
// const { terser } = require('rollup-plugin-terser')
// const filesize = require('rollup-plugin-filesize')

module.exports = (config) => {
    const { input, name, dir, externals, displayName, isProduction, PACKAGE_JSON_PATH } = config

    // const filesizeConfig = {
    //   showGzippedSize: true,
    //   showBrotliSize: false,
    //   showMinifiedSize: true,
    // }

    const BABEL_CONFIG_LOCATION = path.resolve(process.env.INIT_CWD, '.babelrc.js')
    
    // console.log('INFO-> ', config, process.env.PROJECT_CWD, process.env.INIT_CWD)

  
    // console.log(`${ isProduction ? 'production' : 'development' } mode bundle`)

    const plugins =  [
      nodeResolve({
        useBuiltIns: 'entry',
        preferBuiltins: true,
        rootDir: process.env.INIT_CWD
      }),
      json(),
      babel({
          babelHelpers: 'runtime',
          configFile: BABEL_CONFIG_LOCATION,
      }),
      commonjs({
          esmExternals: false,
          requireReturnsDefault: 'namespace',
      }),
      postcss({
        extract: 'bundle.css',
        modules: true, // can be set to an object with these options https://github.com/madyankin/postcss-modules
        sourceMap: true,
        plugins: [
          cssnano({}),
          reporter()
        ]
      }),
      copy({
        targets: [
          { 
            src: `${input}/scss`, 
            dest: `${dir}`
          }
        ]
      }),
      // scss({
      //   extract: true,
      //   sass: require('sass'),
      //   sourceMap: true,
      //   output: `${dir}/bundle.css`,
      //   // output: isProduction ? `${dir}/bundle.min.css` : `${dir}/bundle.css`,
      //   // ...isProduction && { outputStyle: 'compact' }
      //   // trying to figure out what the equivalent of --embed-sources is for sass
      // })
      // isProd && terser(),
      // filesize(filesizeConfig)
    ]

    return [
      {
          plugins,
          external: [
            /@babel\/runtime/,
            /lodash\.once/,
            ...externals
          ],
          input,
          context: 'window',
          output: {
              dir: `${dir}/cjs`,
              format: 'cjs',
              name,
              exports: 'auto',
              preserveModules: true,
              preserveModulesRoot: path.join(process.env.PROJECT_CWD, `packages/${displayName}/src`)
          }
        },
        {
            plugins,
            external: [
              /@babel\/runtime/,
              /lodash\.once/,
              ...externals
            ],
            input,
            context: 'window',
            output: {
                dir,
                format: 'esm',
                name,
                exports: 'auto',
                preserveModules: true,
                preserveModulesRoot: path.join(process.env.PROJECT_CWD, `packages/${displayName}/src`)
            }
          }
      ]
  }