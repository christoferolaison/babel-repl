// @flow

import pluginFlowRuntime from 'babel-plugin-flow-runtime';
import pluginReactNativeWeb from 'babel-plugin-react-native-web';

export type Plugins =
  | 'babel-plugin-flow-runtime'
  | 'babel-plugin-react-native-web';

type PluginsMap = { [Plugins]: Function };

export const pluginsMap: PluginsMap = {
  'babel-plugin-flow-runtime': pluginFlowRuntime,
  'babel-plugin-react-native-web': pluginReactNativeWeb,
};

export const plugins = [
  'babel-plugin-flow-runtime',
  'babel-plugin-react-native-web',
];
