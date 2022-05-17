

// yarn pnp requires us to require('') each of the babel imports 
// we are using requireFromConfig so it knows to resolve the plugin files from inside of config's package.json
module.exports = function babel(api) {
    return {
        'presets': [
            [
                require('@babel/preset-env'),
                {
                    modules: false,
                    useBuiltIns: 'entry',
                    corejs: 3,
                    targets: '> 0.25%, not dead',
                    ...process.env.NODE_ENV === 'development' && {
                        debug: true
                    }
                }
            ],
            [
                require('@babel/preset-react'),
                {
                    development: api.env(['development', 'test'])
                }
            ],
        ],
        'plugins': [
            require('@babel/plugin-syntax-class-properties'),
            require('@babel/plugin-proposal-class-properties'),
            [
                require('@babel/plugin-transform-runtime'), {
                    corejs: 3
                }
            ]
        ],
        env: { 
            cjs: { 
              presets: [
                [
                    require('@babel/preset-env'), { 
                        modules: 'commonjs',
                        useBuiltIns: 'entry',
                        corejs: 3,
                        targets: '> 0.25%, not dead',
                        ...process.env.NODE_ENV === 'development' && {
                            debug: true
                        }
                    }
                ],
                [
                    require('@babel/preset-react'),
                    {
                        development: api.env(['development', 'test'])
                    }
                ],
              ]
            }
        }
    }
}