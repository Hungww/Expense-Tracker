const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts.push('cjs', 'svg');

defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg');

defaultConfig.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

module.exports = defaultConfig;