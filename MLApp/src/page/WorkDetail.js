import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WorkDetailComponent from '../component/WorkDetailComponent'


class WorkDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'WorkDetail',
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <WorkDetailComponent item={params.item} navigate={navigate}/>
    );
  }
}


export default WorkDetail;
