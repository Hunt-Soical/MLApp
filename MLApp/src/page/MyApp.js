import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MarketPlace from './Market'
import Me from './Me'
import MyWorkList from './MyWorkList'
import MyCheckList from './MyCheckList'
import SAIcon from '../icon/SAIcon';
/**
 * Screen for first tab.
 * You usually will have this in a separate file.
 */
class MarketNav extends Component {
  static navigationOptions = {
    tabBarIcon: () => <SAIcon name="MarketSelected" height="30" width="30"  fill="grey"/>
  }

  render() {
    const { navigate } = this.props.navigation;
    return <MarketPlace navigate={navigate} />
  }
}

/**
 * Screen for second tab.
 * You usually will have this in a separate file.
 */
class CurrentNav extends Component {
  static navigationOptions = {
    tabBarIcon: () => <SAIcon name="CurrentSelected" height="30" width="30"  fill="grey"/>
  }

  render() {
    const { navigate } = this.props.navigation;
    return <MyWorkList navigate={navigate} />
  }
}

class CheckNav extends Component {
  static navigationOptions = {
    tabBarIcon: () => <Icon name="done-all" size={25}  color="grey"/>
  }

  render() {
    const { navigate } = this.props.navigation;
    return <MyCheckList navigate={navigate} />
  }
}

/**
 * Screen for third tab.
 * You usually will have this in a separate file.
 */
class MeNav extends Component {
  static navigationOptions = {
    tabBarIcon: () => <SAIcon name="ProfileSelected" height="30" width="30"  fill="grey"/>
  }

  render() {
    const { navigate } = this.props.navigation;
    return <Me navigate={navigate} />
  }
}


/**
 * react-navigation's TabNavigator.
 */
export const  Main = TabNavigator({
  MarketNav: { screen: MarketNav },
  CurrentNav: { screen: CurrentNav },
  CheckNav: { screen: CheckNav },
  MeNav: { screen: MeNav }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {

      labelColor: 'grey',
      rippleColor: 'grey',
      activeLabelColor: "#3FAAC5",
      style: {borderWidth: 0.5, borderColor: 'grey'},
      tabs: {
        MarketNav: {
          activeIcon: <SAIcon name="MarketSelected" height="30" width="30"  fill="#0E5F9D"/>,
          label: "Market"
        },
        CurrentNav: {
          activeIcon: <SAIcon name="CurrentSelected" height="30" width="30"  fill="#0E5F9D"/>,
          label: "Current"
        },
        CheckNav: {
          activeIcon: <Icon name="done-all" size={25}  color="#0E5F9D"/>,
          label: "Check"
        },
        MeNav: {
          activeIcon: <SAIcon name="ProfileSelected" height="30" width="30"  fill="#0E5F9D"/>,
          label: "Profile"
        }
      }
    }
  }
});



class MyApp extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'home',
    header: null
  });

  render() {
    return (
      <Main navigation={this.props.navigation} />
    );
  }
}


MyApp.router = Main.router;

export default MyApp;
