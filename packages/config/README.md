# config

## `yarn add --dev config`

This exports:
```
    babel: (api) => babel(api) # default babel config
    babelPath # path of default babel config
    jestConfigBase # for usage by all packages and products
    requireFromConfig, # whenever you have an issue with requiring a package only defined in packages/config, use this
    createRequire # if you have an issue where pnp is having issues resolving a module, use this
    testUtils # for when you want to use @testing-library/react in another package
```