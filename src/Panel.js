// @flow

import * as React from 'react';
import { View, Text, Switch } from 'react-native-web';
import { presets } from './presets';
import type { Presets } from './presets';
import { plugins } from './plugins';
import type { Plugins } from './plugins';

const List = ({
  title,
  items,
  render,
}: {|
  title: string,
  items: Array<Plugins | Presets>,
  render: (string, boolean) => React.Node,
|}) => (
  <View style={{ marginTop: 20 }}>
    <Text style={{ fontSize: 20, marginBottom: 6, marginLeft: 10 }}>
      {title}
    </Text>
    <View
      style={{
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
      }}
    >
      {items.map((item, i) => render(item, items.length === i + 1))}
    </View>
  </View>
);

const Item = ({
  on,
  onValueChange,
  title,
  isLast,
}: {
  on: boolean,
  isLast: boolean,
  onValueChange: boolean => void,
  title: string,
}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      ...(!isLast
        ? { borderBottomColor: '#E5E5E5', borderBottomWidth: 1 }
        : {}),
      marginHorizontal: 10,
    }}
  >
    <Text>{title}</Text>
    <Switch
      style={{ marginHorizontal: 4, height: 16 }}
      value={on}
      onValueChange={onValueChange}
    />
  </View>
);

function Panel({
  handlePresetChange,
  handlePluginChange,
  selectedPresets,
  selectedPlugins,
}: {
  handlePresetChange: (boolean, string) => void,
  handlePluginChange: (boolean, string) => void,
  selectedPresets: Array<Presets>,
  selectedPlugins: Array<Plugins>,
}) {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 32, marginLeft: 10 }}>Babel REPL</Text>
      <Text style={{ fontSize: 10, marginLeft: 10 }}>v. 7.0.0-beta.40</Text>
      <List
        items={presets}
        title="Presets"
        render={(preset, isLast) => (
          <Item
            key={preset}
            isLast={isLast}
            title={preset}
            on={selectedPresets.includes(preset)}
            onValueChange={on => handlePresetChange(on, preset)}
          />
        )}
      />
      <List
        items={plugins}
        title="Plugins"
        render={(plugin, isLast) => (
          <Item
            key={plugin}
            isLast={isLast}
            title={plugin}
            on={selectedPlugins.includes(plugin)}
            onValueChange={on => handlePluginChange(on, plugin)}
          />
        )}
      />
    </View>
  );
}

export default Panel;
