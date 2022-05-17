const requireFromConfig = require('../../requireFromConfig')
const { configure } = requireFromConfig('enzyme')
const Adapter = requireFromConfig('enzyme-adapter-react-16')

module.exports = configure({
    adapter: new Adapter(),
})