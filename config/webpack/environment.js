const { environment } = require('@rails/webpacker')

// environment.plugins.prepend('Provide', new webpack.ProvidePlugin({
//   $: 'jquery',
//   JQuery: 'jquery',
//   Popper: ['popper.js', 'default']
// }))

module.exports = environment

const nodeModulesLoader = environment.loaders.get('nodeModules')

if (!Array.isArray(nodeModulesLoader.exclude)) {
  nodeModulesLoader.exclude = (nodeModulesLoader.exclude == null) ? [] : [nodeModulesLoader.exclude]
}
nodeModulesLoader.exclude.push(/react-table/)
