// @flow

import React, { Component } from 'react';
import { View } from 'react-native-web';
import Editor from './Editor';
import Panel from './Panel';
import { transform } from '@babel/core';
import { presetsMap } from './presets';
import type { Presets } from './presets';
import { pluginsMap } from './plugins';
import type { Plugins } from './plugins';
import debounce from 'debounce';

type State = {
  status: 'idle' | 'initializing',
  code: string,
  selectedPresets: Array<Presets>,
  selectedPlugins: Array<Plugins>,
};

class App extends Component<{}, State> {
  state = {
    status: 'initializing',
    code: '',
    selectedPresets: [],
    selectedPlugins: [],
  };

  componentDidMount() {
    this.retrive();
  }

  componentDidUpdate() {
    this.transform();
    this.persist();
  }

  retrive = () => {
    const retrivedState = localStorage.getItem('br');
    if (retrivedState) {
      this.setState(state =>
        this.reducer(state, {
          type: 'SET_PERSISTED_STATE',
          persistedState: JSON.parse(retrivedState),
        }),
      );
    }
    this.setState(
      state => this.reducer(state, { type: 'IDLE' }),
      this.transform,
    );
  };

  persist = () => {
    localStorage.setItem('br', JSON.stringify(this.state));
  };

  reducer = (state: State, action: Object) => {
    switch (action.type) {
      case 'CODE_CHANGE':
        return {
          code: action.code,
        };
      case 'SET_PERSISTED_STATE':
        return {
          ...action.persistedState,
        };
      case 'PRESET_CHANGE':
        return {
          selectedPresets: action.on
            ? [...state.selectedPresets, action.preset]
            : state.selectedPresets.filter(preset => preset !== action.preset),
        };
      case 'PLUGIN_CHANGE':
        return {
          selectedPlugins: action.on
            ? [...state.selectedPlugins, action.plugin]
            : state.selectedPlugins.filter(preset => preset !== action.plugin),
        };
      case 'IDLE':
        return {
          status: 'idle',
        };
      default:
        return null;
    }
  };

  transformedCodeEditor = undefined;

  handlePresetChange = (on: boolean, preset: string) => {
    this.setState(state =>
      this.reducer(state, { type: 'PRESET_CHANGE', on, preset }),
    );
  };

  handlePluginChange = (on: boolean, plugin: string) => {
    this.setState(state =>
      this.reducer(state, { type: 'PLUGIN_CHANGE', on, plugin }),
    );
  };

  setTransformedCode = (code: string) => {
    if (this.transformedCodeEditor) {
      this.transformedCodeEditor.getCodeMirror().doc.setValue(code);
    }
  };

  handleCodeEdit = debounce(code => {
    this.setState(state => this.reducer(state, { type: 'CODE_CHANGE', code }));
  }, 500);

  transform = () => {
    try {
      const transformed = transform(this.state.code, {
        presets: this.state.selectedPresets.map(
          preset =>
            preset === '@babel/preset-env'
              ? [
                  presetsMap[preset],
                  {
                    debug: true,
                    useBuiltIns: 'usage',
                    targets: {
                      node: '8.9',
                      browsers: [
                        'chrome 50',
                        'firefox 52',
                        'ie 11',
                        'edge 15',
                        'safari 9',
                      ],
                    },
                  },
                ]
              : presetsMap[preset],
        ),
        plugins: this.state.selectedPlugins.map(plugins => pluginsMap[plugins]),
      });
      this.setTransformedCode(transformed.code);
    } catch (error) {
      this.setTransformedCode(error.toString());
    }
  };

  render() {
    if (this.state.status === 'initializing') {
      return null;
    }
    var options = {
      lineNumbers: true,
      theme: 'oceanic-next',
      mode: 'jsx',
    };
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexGrow: 1, width: '20%', height: '100vh' }}>
          <Panel
            handlePresetChange={this.handlePresetChange}
            selectedPresets={this.state.selectedPresets}
            handlePluginChange={this.handlePluginChange}
            selectedPlugins={this.state.selectedPlugins}
          />
        </View>
        <View style={{ flexGrow: 1, width: '40%', height: '100vh' }}>
          <Editor
            value={this.state.code}
            handleChange={this.handleCodeEdit}
            options={options}
          />
        </View>
        <View style={{ flexGrow: 1, width: '40%' }}>
          <Editor
            editorRef={ref => (this.transformedCodeEditor = ref)}
            options={options}
          />
        </View>
      </View>
    );
  }
}

export default App;
