// @flow

import { AppRegistry } from 'react-native-web';
import './index.css';
import App from './App';
import 'codemirror/theme/oceanic-next.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
});
