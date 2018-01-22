import { AppRegistry, View, StyleSheet, Text, ScrollView } from 'react-native';
import React, { Component} from 'react';
import { StackNavigator } from 'react-navigation'

import MyApp from '../page/MyApp'
import WorkDetail from '../page/WorkDetail'
import TagDialog from '../page/TagDialog'
import FacebookLogin from '../page/FacebookLogin'
import RewardList from '../page/RewardList'
import QuizDialog from '../page/QuizDialog'
import CheckDialog from '../page/CheckDialog'

export default AppNavigator = StackNavigator({
  Main: { screen: MyApp },
  WorkDetail: {screen: WorkDetail},
  TagDialog: {screen: TagDialog},
  FacebookLogin: {screen: FacebookLogin},
  RewardList: {screen: RewardList},
  QuizDialog: {screen: QuizDialog},
  CheckDialog: {screen: CheckDialog},
});

AppRegistry.registerComponent('AppNavigator', () => AppNavigator);
