import { AppRegistry, View, StyleSheet, Text, ScrollView } from 'react-native';
import React, { Component} from 'react';
import { StackNavigator } from 'react-navigation'
import CardItem from '../component/CardItem'
import MyWorkList from './MyWorkList'
import WorkDetail from './WorkDetail'

export default MyWork = StackNavigator({
  Home: { screen: MyWorkList },
  WorkDetail: {screen: WorkDetail}
});

AppRegistry.registerComponent('MyWork', () => MyWork);