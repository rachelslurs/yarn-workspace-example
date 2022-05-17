const buildPackage = require('./buildPackage')
const buildProduct = require('./buildProduct')

module.exports = (config) => {
  // console.log(config)
  const { isProduct } = config

  if (isProduct) {
    return buildProduct(config)
  } else {
    return buildPackage(config)
  }
}