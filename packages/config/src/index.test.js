const config = require('./index')

it('config to match config object keys', () => {
    expect(Object.keys(config)).toMatchSnapshot()
})
