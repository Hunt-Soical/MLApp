import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView, Text, TextInput, View, Button, ImageBackground, TouchableOpacity, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { login, register } from '../action/auth';
import { addItems, updateAll } from '../action/myworkAction';
import KeyboardSpacer from 'react-native-keyboard-spacer';
const FBSDK = require('react-native-fbsdk');

const {
  LoginButton,
  AccessToken,
  ShareDialog,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} = FBSDK;

class Login extends Component {
    constructor (props) {
        super(props);
        const shareLinkContent = {
                  contentType: 'link',
                  contentUrl: 'https://www.facebook.com/',
                };

        this.state = {
            route: 'Login',
            username: '',
            password: '',
            id: '',
            shareLinkContent: shareLinkContent,
        };

        onSignUpFun = (thirdPartyID, avator, username) => {
            this.props.onSignUp(thirdPartyID, avator, username);
        }

    }

    _responseInfoCallback(error: ?Object, result: ?Object) {
      if (error) {
        alert('Error fetching data: ' + error.toString());
      } else {
        thirdPartyID = result.id;
        avator = result.picture.data.url;
        username = result.first_name + " " + result.last_name;
        onSignUpFun(thirdPartyID, avator, username);
      }
    }



    fbauth = () => {
        const infoRequest = new GraphRequest(
            '/me',
            {
                parameters: {
                    'fields': {
                        'string' : 'email,first_name,last_name,picture'
                    }
                }
            },
            this._responseInfoCallback,
        );
        LoginManager.logInWithReadPermissions(['public_profile','email']).then(function(result){
            if(result.isCancelled){
                console.log('loging cancelled')
            }
            else {
                console.log('login success' + result.grantedPermissions)
                new GraphRequestManager().addRequest(infoRequest).start();
            }
        }, function(error){
            console.log('An error occured: ' + error)
        })
    }

    userLogin (e) {
        this.props.onLogin(this.state.username, this.state.password);
        e.preventDefault();
    }

    toggleRoute (e) {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        this.setState({ route: alt });
        e.preventDefault();
    }

    render () {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        return (
          <ImageBackground source={require('../assets/bg_login.png')} style={styles.container}>
            <View>
                <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                      }}>
                  <Image source={require('../assets/logo_login.png')} style={{width: 80, height: 80}} />
                </View>
                <TextInput
                    style={{height:50, borderColor:'white', borderWidth:1, marginLeft:20, marginRight:20, borderRadius:10, color: 'white'}}
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholderTextColor='white'
                    textColor='white'
                    autoFocus={true}
                    keyboardType='email-address'
                    textAlign='center'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })} />
                <TextInput
                    style={{height:50, borderColor:'white', borderWidth:1, marginLeft:20, marginRight:20, borderRadius:10, color: 'white',marginTop:20}}
                    placeholder='Password'
                    autoCapitalize='none'
                    placeholderTextColor='white'
                    autoCorrect={false}
                    secureTextEntry={true}
                    textAlign='center'
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })} />
                <View style={{margin: 7}}/>
                <TouchableOpacity
                        style={styles.loginScreenButton}
                        onPress={(e) => this.userLogin(e)}
                        underlayColor='#fff'>
                        <Text style={styles.loginText}>Login</Text>
               </TouchableOpacity>
                <KeyboardSpacer/>
            </View>
            <TouchableOpacity
                    style={styles.fbButton}
                    onPress={() => this.fbauth()}
                    underlayColor='#fff'>

                    <View style={styles.keywordRowContainer}>
                        <Icon size={30} name="facebook-square" color="#fff" onPress={() => this.fbauth()} />
                        <Text style={styles.fbText}>Login With Facebook</Text>
                    </View>
           </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        userId: state.auth.id
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => { dispatch(login(username, password)); },
        onSignUp: (thirdPartyID, avator, username) => { dispatch(register(thirdPartyID, avator, username)); },
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  shareText: {
    fontSize: 20,
    margin: 10,
  },
  loginScreenButton:{
    marginRight:20,
    marginLeft:20,
    marginTop:10,
    marginBottom: 20,
    height:50,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'white',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  fbButton:{
    marginRight:10,
    marginLeft:10,
    marginTop:80,
    marginBottom: 20,
    height:50,
    paddingTop:10,
    backgroundColor:'#3b5998',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#3b5998'
  },
  loginText:{
      color:'blue',
      textAlign:'center',
      fontSize: 20,

  },
  fbText:{
      color:'white',
      textAlign:'center',
      fontSize: 20,
      paddingLeft: 20,
      paddingTop: 0,
  },
  keywordRowContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
  },
});



export default connect(mapStateToProps, mapDispatchToProps)(Login);
