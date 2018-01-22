import { Text, Image, View, StyleSheet, ScrollView, ToastAndroid, Platform } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ListItem, Subheader, Toolbar, COLOR, ThemeProvider, Avatar, Divider, Button } from 'react-native-material-ui';
import { logout } from '../action/auth';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
    container: {
    },
});

const buttonStyle = StyleSheet.create({
    container:{
        height: 30
    }
})

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
    listItem: {
        leftElementContainer: {
            width: 50,
        },
    },
    button: {
      container: {
          height: 25,
      },
    }
};



class Payment extends Component {
    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
                <View style={styles.container}>
                  <Toolbar
                      leftElement="arrow-back"
                      onLeftElementPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                      centerElement="RewordList"
                  />
                  <ScrollView>
                      {this.props.myWorkItmes.map((item) =>
                          <View key={item.id}>
                            <Divider />
                            <ListItem
                                leftElement={<Avatar text={item.abbr} />}
                                centerElement={{
                                    primaryText: item.company,
                                    secondaryText: (item.finishTotal*parseFloat(item.reward)).toString(),
                                }}
                                rightElement={<Button primary raised text="Bill" onPress={() => alert("xxxxxx")} />}
                            />
                          </View>
                          )}
                  </ScrollView>
                </View>
            </ThemeProvider>
        );
    }
}

RewardList.navigationOptions = {
  header: null
};


const mapStateToProps = (state, ownProps) => {
    return {
        userId: state.auth.id,
        myWorkItmes: state.myWorkItmes
    };
}

export default connect(mapStateToProps)(Payment);
