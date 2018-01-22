import { Text, Image, View, StyleSheet, ScrollView, ToastAndroid, Platform, Switch, } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ListItem, Subheader, Toolbar, COLOR, ThemeProvider, Avatar } from 'react-native-material-ui';
import { logout } from '../action/auth';
import { connect } from 'react-redux';
import { LoginManager } from 'react-native-fbsdk'
import SAIcon from '../icon/SAIcon';

const styles = StyleSheet.create({
    container: {
    },
});

const uiTheme = {
    palette: {
        primaryColor: "#3767C5",
    },
    toolbar: {
        container: {
            height: 80,
        },
        centerElementContainer: {
          flex: 1,
          justifyContent: 'center',
        },
        titleText:{
          textAlign:'center',
        }
    },
    subheader: {
       container: {
            height: 25,
        },
    }
};

const itemStyle = StyleSheet.create({
    leftElementContainer: {
        width: 50,
    },
    secondaryText: {
      color:'#2678D5'
    }
})

const listItemStyle = StyleSheet.create({
    leftElementContainer: {
        width: 40,
        height: 40,
        backgroundColor:"#326EF6",
        borderRadius:5,
        paddingLeft: 5,
        justifyContent: 'center',
        shadowColor: '#326EF6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    secondaryText: {
      color:'#2678D5'
    }
})



class Me extends Component {

    constructor() {
      super();
      this.state = {
        switchValue: true,
      }
    }
    toggleSwitch = (value) => {
      this.setState({switchValue: value})
    }

    userLogout () {
        LoginManager.logOut();
        this.props.logout();
    }


    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
                <View style={styles.container}>
                    <Toolbar
                        leftElement=""
                        centerElement="SETTING"
                        rightElement=""
                    />
                    <ScrollView>
                        <Subheader text="" />
                        <ListItem
                            leftElement={<Avatar image={<Image style={{width: 50, height: 50}} source={{uri: this.props.avator}} />} />}
                            centerElement={{
                                primaryText: this.props.username,
                                secondaryText: this.props.userId,
                            }}
                            onPress={() => {}}
                            style={itemStyle}
                        />


                        <Subheader text="" />
                        <ListItem
                            divider
                            leftElement={<SAIcon name="Notifications" height="30" width="30"  fill="#fff"/>}
                            centerElement="Notification"
                            rightElement={<Switch onValueChange = {this.toggleSwitch} value = {this.state.switchValue} />}
                            style={listItemStyle}
                        />

                        <Subheader text="" />
                        <ListItem
                            divider
                            leftElement={<SAIcon name="Reward" height="30" width="30"  fill="#fff"/>}
                            centerElement="My reward"
                            onPress={() => this.props.navigate('RewardList')}
                            style={listItemStyle}
                        />
                        <ListItem
                            divider
                            leftElement={<SAIcon name="Payment" height="30" width="30"  fill="#fff"/>}
                            centerElement="Payment"
                            onLeftElementPress={() => {
                                  alert('Left element pressed');
                                }
                            }
                            onPress={() => alert('List item pressed')}
                            style={listItemStyle}
                        />

                        <Subheader text="" />
                        <ListItem
                            divider
                            leftElement={<SAIcon name="Setting" height="30" width="30"  fill="#fff"/>}
                            centerElement={<Text>Settings</Text>}
                            style={listItemStyle}
                        />

                        <Subheader text="" />
                        <ListItem
                            divider
                            leftElement={<SAIcon name="Logout" height="30" width="30"  fill="#fff"/>}
                            centerElement={<Text>Logout</Text>}
                            onPress={() => this.userLogout()}
                            style={listItemStyle}
                        />
                    </ScrollView>
                </View>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        username: state.auth.username,
        userId: state.auth.id,
        avator: state.auth.avator,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch(logout()); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Me);
