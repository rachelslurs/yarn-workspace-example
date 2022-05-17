const requireFromConfig = require('../requireFromConfig')

// yarn pnp requires us to require('') each of the babel imports 
// we are using requireFromConfig so it knows to resolve the plugin files from inside of config's package.json
module.exports = function babel(api) {
    // const isTest = api.env('test')
    // console.log('testing?', isTest)
    return {
        'presets': [
            [
                requireFromConfig('@babel/preset-env'),
                {
                    modules: 'auto',
                    useBuiltIns: 'entry',
                    corejs: 3,
                    targets: '> 0.25%, not dead',
                    ...api.env(['development']) && {
                        debug: true
                    }
                }
            ],
            [
                requireFromConfig('@babel/preset-react'),
                {
                    development: api.env(['development', 'test'])
                }
            ],
        ],
        'plugins': [
            requireFromConfig('@babel/plugin-syntax-class-properties'),
            requireFromConfig('@babel/plugin-proposal-class-properties'),
            [
                requireFromConfig('@babel/plugin-transform-runtime'), {
                    corejs: 3
                }
            ]
        ],
        env: { 
            cjs: { 
              presets: [
                [
                    requireFromConfig('@babel/preset-env'), { 
                        modules: 'commonjs',
                        useBuiltIns: 'entry',
                        corejs: 3,
                        targets: '> 0.25%, not dead',
                        ...api.env(['development']) && {
                            debug: true
                        }
                    }
                ],
                [
                    requireFromConfig('@babel/preset-react'),
                    {
                        development: api.env(['development'])
                    }
                ],
              ],
              plugins: [
                  requireFromConfig('@babel/plugin-syntax-class-properties'),
                  requireFromConfig('@babel/plugin-proposal-class-properties'),
                  [
                      requireFromConfig('@babel/plugin-transform-runtime'), {
                          corejs: 3
                      }
                  ]
              ],
            },

            test: {
                presets: [
                    [
                        requireFromConfig('@babel/preset-env'),
                        {
                            useBuiltIns: 'entry',
                            corejs: 3,
                            targets: '> 0.25%, not dead',
                            debug: true
                        }
                    ],
                    [
                        requireFromConfig('@babel/preset-react'),
                        {
                            development: true
                        }
                    ]
                ],
                plugins: [
                    requireFromConfig('@babel/plugin-syntax-class-properties'),
                    requireFromConfig('@babel/plugin-proposal-class-properties'),
                    [
                        requireFromConfig('@babel/plugin-transform-runtime'), {
                            corejs: 3
                        }
                    ]
                ],
              }
        }
    }
}