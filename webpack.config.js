const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const tsconfig = require('./tsconfig.json');
let rawAlias   = tsconfig.compilerOptions.paths;
Object.keys(rawAlias).forEach(key => {
  rawAlias[key] = rawAlias[key].filter(item => !`${item}`.endsWith("index"))
  if(rawAlias[key].length===0) {
    delete rawAlias[key]
  }
})
let alias      = {};
const path = require("path")

for (let x in rawAlias) {
    alias[x.replace('/*', '')] = `${rawAlias[x].map(p => p.replace('/*', ''))[0]}`;
}
Object.keys(alias).forEach(key => {
  alias[key] = path.resolve(__dirname, "./"+(alias[key].endsWith("/") ? alias[key].substring(0, alias[key].length-1) : alias[key])+"/")
})

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.resolve.plugins = [new TsconfigPathsPlugin(), ...config.resolve.plugins]
  config.resolve.alias = {...config.resolve.alias, ...alias}
  return config;
};
