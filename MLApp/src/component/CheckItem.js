import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar, Card, ListItem, Toolbar, ThemeProvider, COLOR, Button, Subheader } from 'react-native-material-ui';
import { changeCurrent } from '../action/currentItemAction';
import { deleteCheckItem } from '../action/mycheckAction';
import { connect } from 'react-redux';
import SAIcon from '../icon/SAIcon';
import { mlConfig } from '../config/mlConfig'

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
        marginHorizontal: 80,
    },
    bottomButton: {
        height: 50,
        backgroundColor:"#2A67B1",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    bottomText: {
        color:"#fff",
        textAlign:'center',
        fontSize: 15,
        marginTop:15,
        fontWeight: 'bold'
    }
});

const avatorStyle = StyleSheet.create({
    container: {
      borderRadius: 2,
      backgroundColor: "#00C1D5",
    }
})

const cardStyle = StyleSheet.create({
    container: {
      paddingTop:10,
      borderRadius: 10,
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
};

const getKeywordItem = (keyworkItems) => {
        return keyworkItems.map((keywordItem, index) => {
            return(
                <View key={keywordItem.toString()} style={{paddingLeft:8}}>
                    <Text style={{color:"#327FE2", textDecorationLine:'underline'}}>
                        {keywordItem}
                    </Text>
                </View>
            );
        });
}


class CheckItem extends Component {
    check(){
        this.props.navigate('CheckDialog', { item: this.props.item })
    }

    deleteCheckItem(){
      const requestOptions = {
          method: 'DELETE',
      };

      return fetch(mlConfig.API_HOST+'/api/deleteMyCheck/'+this.props.userId+'/'+this.props.item.id, requestOptions)
          .then(response => {
              if (!response.ok) {
                  return Promise.reject(response.statusText);
              }

              return response;
          })
          .then(result => {
              this.props.deleteMyCheck(this.props.item.id)

              return;
          })
          .catch ((error) => {
              alert(error);
          });
    }

    render() {
        return (
            <Card style={cardStyle}>
                <ListItem
                    leftElement={<Avatar text={this.props.item.abbr} style={avatorStyle} />}
                    centerElement={{
                        primaryText: this.props.item.company,
                        secondaryText: this.props.item.createDate,
                    }}
                    rightElement="clear"
                    onRightElementPress={() => this.deleteCheckItem()}
                />
                <View style={styles.textContainer}>
                    <View style={styles.keywordRowContainer}>
                        <Text style={{color:"#292929", fontWeight: 'bold'}}>
                            Description:
                        </Text>
                        <View style={{flex: 1, paddingLeft:8}}>
                            <Text style={{color:COLOR.black}}>
                                {this.props.item.description}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.keywordRowContainer}>
                        <Text style={{color:"#292929", fontWeight: 'bold'}}>
                            Keywords:
                        </Text>
                        {getKeywordItem(this.props.item.keywords)}
                    </View>
                    <View style={styles.keywordRowContainer}>
                        <Text style={{color:"#292929", fontWeight: 'bold'}}>
                            Reward:
                        </Text>
                        <View style={{paddingLeft:8}}>
                            <Text style={{color:"#327FE2", textDecorationLine:'underline'}}>
                                {this.props.item.reward}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.keywordRowContainer}>
                        <Text style={{color:"#292929", fontWeight: 'bold'}}>
                            Expiration Date:
                        </Text>
                        <View style={{paddingLeft:8}}>
                            <Text style={{color:"#327FE2", textDecorationLine:'underline'}}>
                                {this.props.item.expirationDate}
                            </Text>
                        </View>
                    </View>
                    <Subheader text="" style={subheaderStyle} />
                    <View style={styles.numRowContainer}>
                        <View style={styles.icon}>
                            <SAIcon name="Total" height="50" width="50"  fill="#0E5E9C"/>
                            <Text>Total</Text>
                            <Text style={{textAlign:"center", color:"black"}}>{this.props.item.finishTotal}</Text>
                        </View>
                        <View style={styles.icon}>
                            <SAIcon name="Batch" height="50" width="50"  fill="#0E5E9C"/>
                            <Text>Batch</Text>
                            <Text style={{textAlign:"center", color:"black"}}>{this.props.item.batchNumber}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                        style={styles.bottomButton}
                        onPress={() => this.check()}
                        underlayColor='#fff'>
                      <View style={styles.bottomButton}>
                        <Text style={styles.bottomText}>
                            Check
                        </Text>
                      </View>
                </TouchableOpacity>
            </Card>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userId: state.auth.id,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteMyCheck: (itemId) => { dispatch(deleteCheckItem(itemId)); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckItem);
