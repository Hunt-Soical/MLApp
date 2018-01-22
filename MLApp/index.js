import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import App from './src/App';
import store from './src/Index';
import { Provider } from 'react-redux';

export default class MLApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MLApp', () => MLApp);
