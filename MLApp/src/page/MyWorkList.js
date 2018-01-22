import { AppRegistry, View, StyleSheet, Text, ScrollView } from 'react-native';
import React, { Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar, Card, ListItem, Toolbar, ThemeProvider, COLOR, Button, Subheader } from 'react-native-material-ui';
import CardItem from '../component/CardItem'
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

class MyWorkList extends Component {
    constructor(props) {
        super(props);
    }

    WholeItem = (tmp_array, navigate) => {
        return tmp_array.map(function(item, i){
            return(
                <CardItem item={item} navigate={navigate} key={i} />
            );
        });
    }

    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
              <View style={{marginBottom:80}}>
                <Toolbar
                    leftElement=""
                    centerElement="My Works"
                    searchable={{
                      autoFocus: true,
                      placeholder: 'Search',
                      onChangeText: searchFun
                    }}
                />
                <ScrollView>
                    {this.WholeItem(this.props.myWorkItmes, this.props.navigate)}
                </ScrollView>
              </View>
            </ThemeProvider>
        );
    }
}

const workMapStateToProps = (state, ownProps) => {
    return {
        userId: state.auth.id,
        myWorkItmes: state.myWorkItmes
    };
}

const workMapDispatchToProps = (dispatch) => {
    return {
        initMyWorks: (count, page, userId) => { dispatch(updateAll(count, page, userId)); },
    }
}

export default connect(workMapStateToProps, workMapDispatchToProps)(MyWorkList);
