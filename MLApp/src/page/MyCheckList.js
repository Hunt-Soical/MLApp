import { AppRegistry, View, StyleSheet, Text, ScrollView } from 'react-native';
import React, { Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar, Card, ListItem, Toolbar, ThemeProvider, COLOR, Button, Subheader } from 'react-native-material-ui';
import CheckItem from '../component/CheckItem'
import { addItems, updateAll } from '../action/myworkAction';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    textContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    rowContainer: {
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        marginHorizontal: 2,
    },
    keywordRowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    numRowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    keywordButton: {
        borderRadius:20,
        backgroundColor:COLOR.blue200
    },
    icon: {
        marginHorizontal: 30,
    }
});

const avatarStyle = StyleSheet.create({
    container:{
        backgroundColor:COLOR.white
    }
})

const subheaderStyle = StyleSheet.create({
    container:{
        height: 25
    }
})

const buttonStyle = StyleSheet.create({
    container:{
        height: 30
    }
})

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
    listItem: {
        leftElementContainer: {
            width: 50,
        },
    },
};

const searchFun = (keyword) => {
    alert("search"+keyword)
}

class MyCheckList extends Component {
    constructor(props) {
        super(props);
    }

    WholeItem = (tmp_array, navigate) => {
        return tmp_array.map(function(item, i){
            return(
                <CheckItem item={item} navigate={navigate} key={i} />
            );
        });
    }

    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
              <View style={{marginBottom:80}}>
                <Toolbar
                    leftElement=""
                    centerElement="My Checks"
                    searchable={{
                      autoFocus: true,
                      placeholder: 'Search',
                      onChangeText: searchFun
                    }}
                />
                <ScrollView>
                    {this.WholeItem(this.props.myCheckItmes, this.props.navigate)}
                </ScrollView>
              </View>
            </ThemeProvider>
        );
    }
}

const checkMapStateToProps = (state, ownProps) => {
    return {
        userId: state.auth.id,
        myCheckItmes: state.myCheckItmes
    };
}

const checkMapDispatchToProps = (dispatch) => {
    return {
        initMyChecks: (count, page, userId) => { dispatch(updateAllCheck(count, page, userId)); },
    }
}

export default connect(checkMapStateToProps, checkMapDispatchToProps)(MyCheckList);
