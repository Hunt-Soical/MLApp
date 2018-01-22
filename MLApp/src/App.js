/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './page/Login';
import { connect } from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import { addItems, updateAll } from './action/myworkAction';
import { updateAllCheck } from './action/mycheckAction';
import SplashScreen from 'react-native-splash-screen'

class App extends Component<{}> {
  componentDidMount() {
        SplashScreen.hide();
    }
  render() {
      if (this.props.isLoggedIn) {
          this.props.initMyWorks(100, 0, this.props.userId);
          this.props.initMyChecks(100, 0, this.props.userId);
          return <AppNavigator />;
      } else {
         return <Login />;
      }
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        userId: state.auth.id,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        initMyWorks: (count, page, userId) => { dispatch(updateAll(count, page, userId)); },
        initMyChecks: (count, page, userId) => { dispatch(updateAllCheck(count, page, userId)); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
