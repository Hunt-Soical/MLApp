import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { Component} from 'react';
import { Avatar, Card, ListItem, Toolbar, ThemeProvider, COLOR, Button } from 'react-native-material-ui';
import { addItems, addPlainItems } from '../action/myworkAction';
import { addPlainCheckItems } from '../action/mycheckAction';
import { changeCurrent } from '../action/currentItemAction';
import { connect } from 'react-redux';
import { mlConfig } from '../config/mlConfig'
import QuizDialog from './QuizDialog'
import CheckDialog from './CheckDialog'

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
    buttonContainer: {
        marginHorizontal: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:30,
    },

    keywordRowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    keywordButton: {
        borderRadius:20,
        backgroundColor:COLOR.blue200
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
    },
    rowbottomButton: {
        height: 40,
        paddingHorizontal: 15,
        backgroundColor:"#2A67B1",
        borderRadius: 8,
    },
    rowbottomText: {
        color:"#fff",
        textAlign:'center',
        fontSize: 13,
        marginTop:13,
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
};



class MarketPlace extends Component {

    constructor(props) {
        super(props);
        this.state = {
          items: [],
          myworkMap: {}
        };
    }

    componentDidMount() {
        this.pullItems();
    }

    async pullItems() {
        try{
            let response = await fetch(mlConfig.API_HOST+'/api/getMarketItem?count=10&page=0');
            let result = await response.json();
            marketItems = result.result
            myWorkMap = {}
            this.props.myWorkItmes.map((wItem) => {
                myWorkMap[wItem.id] = 1
            })

            marketItems.map((item) => {
                item.own = 0
                if(myWorkMap[item.id]){
                    item.own = 1
                }
            })
            this.setState({
                items: marketItems
            })

        }catch (err) {
          alert(JSON.stringify(err));
        }
    }

    acceptAndWork = (item) => {
            workItem = item;
            exist=0
            this.props.myWorkItmes.map((myitem) => {
                    if(myitem.id == item.id){
                       exist = 1;
                       workItem = myitem;
                       return;
                    }
                }
            )

            if(exist === 0){
                workItem = this.updateMywork(item)
            }else{
                this.props.changeCurrent(workItem.id)
                this.props.navigate('TagDialog', { item: workItem })
            }
        };

    acceptAndCheck = (item) => {
                checkItem = item;
                exist=0
                this.props.myCheckItmes.map((myitem) => {
                        if(myitem.id == item.id){
                           exist = 1;
                           checkItem = myitem;
                           return;
                        }
                    }
                )

                if(exist === 0){
                    checkItem = this.updateMyCheck(item)
                }else{
                    this.props.navigate('CheckDialog', { item: checkItem })
                }
            };

    acceptAndTakeQuiz = (item) => {
                workItem = item;
                this.props.navigate('QuizDialog', { item: workItem })
            };

    updateMywork(item) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "userId":this.props.userId, "workId":item.id})
                };

                return fetch(mlConfig.API_HOST+'/api/createMyWork', requestOptions)
                .then(response => {
                    if (!response.ok) {
                        return Promise.reject(response.statusText);
                    }

                    return response.json();
                })
                .then(result => {
                    item.updateDate = result.updateDate
                    item.finishTotal = 0;
                    items = []
                    items.push(item)
                    this.props.addPlainItems(items)

                    this.props.changeCurrent(item.id)
                    this.props.navigate('TagDialog', { item: item })

                    return;
                })
                .catch ((error) => {
                    alert(error);
                });

    };

    updateMyCheck(item) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "userId":this.props.userId, "workId":item.id})
                };

                return fetch(mlConfig.API_HOST+'/api/createMyCheck', requestOptions)
                .then(response => {
                    if (!response.ok) {
                        return Promise.reject(response.statusText);
                    }

                    return response.json();
                })
                .then(result => {
                    item.updateDate = result.updateDate
                    item.finishTotal = 0;
                    items = []
                    items.push(item)
                    this.props.addPlainCheckItems(items)
                    this.props.navigate('CheckDialog', { item: item })

                    return;
                })
                .catch ((error) => {
                    alert(error);
                });

    };

    checkState = (item) => {
      contains = -1
      this.props.myWorkItmes.map((myItem) => {
          if(myItem.id == item.id){
             contains = 1;
          }
      });
      return contains
    };

    getActionButton = (item) => {
      if(this.checkState(item) < 0){
        return (
          <TouchableOpacity
                  style={styles.bottomButton}
                  onPress={() => this.acceptAndTakeQuiz(item)}
                  underlayColor='#fff'>
                <View style={styles.bottomButton}>
                    <Text style={styles.bottomText}>
                        ACCEPT AND TAKE A QUIZ
                    </Text>
                </View>
        </TouchableOpacity>
        )
      }else{
        return (
          <View style={styles.buttonContainer}>
          <TouchableOpacity
                  style={styles.rowbottomButton}
                  onPress={() => this.acceptAndWork(item)}
                  underlayColor='#fff'>
                <View style={styles.rowbottomButton}>
                  <Text style={styles.rowbottomText}>
                      WORK
                  </Text>
                </View>
          </TouchableOpacity>
          <TouchableOpacity
                  style={styles.rowbottomButton}
                  onPress={() => this.acceptAndCheck(item)}
                  underlayColor='#fff'>
                <View style={styles.rowbottomButton}>
                  <Text style={styles.rowbottomText}>
                      CHECK
                  </Text>
                </View>
          </TouchableOpacity>
          </View>
          // <View style={styles.buttonContainer}>
          //   <View style={styles.button}>
          //     <Button text="WORK" onPress={() => this.acceptAndWork(item)} />
          //   </View>
          //   <View style={styles.button}>
          //     <Button text="CHECK" onPress={() => this.acceptAndCheck(item)} />
          //   </View>
          // </View>
        )
      }
    }

    keywordsItem = (keyworkItems) => {
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


    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
              <View style={{marginBottom:80}}>
                <Toolbar
                    leftElement="menu"
                    centerElement="Market"
                    searchable={{
                      autoFocus: true,
                      placeholder: 'Search',
                      onChangeText: searchFun
                    }}
                />
                <ScrollView>
                    {this.state.items.map((item) =>
                            <Card key={item.id} style={cardStyle}>
                                <ListItem
                                    leftElement={<Avatar text={item.abbr} style={avatorStyle} />}
                                    centerElement={{
                                        primaryText: item.company,
                                        secondaryText: item.createDate,
                                    }}
                                />
                                <View style={styles.textContainer}>
                                    <View style={styles.keywordRowContainer}>
                                        <Text style={{color:"#292929", fontWeight: 'bold'}}>
                                            Description:
                                        </Text>
                                        <View style={{flex: 1, paddingLeft:8}}>
                                            <Text style={{color:COLOR.black}}>
                                                {item.description}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.keywordRowContainer}>
                                        <Text style={{color:"#292929", fontWeight: 'bold'}}>
                                            Keywords:
                                        </Text>
                                        {this.keywordsItem(item.keywords)}
                                    </View>
                                    <View style={styles.keywordRowContainer}>
                                        <Text style={{color:"#292929", fontWeight: 'bold'}}>
                                            Reward:
                                        </Text>
                                        <View style={{paddingLeft:8}}>
                                            <Text style={{color:"#327FE2", textDecorationLine:'underline'}}>
                                                {item.reward}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.keywordRowContainer}>
                                        <Text style={{color:"#292929", fontWeight: 'bold'}}>
                                            Expiration Date:
                                        </Text>
                                        <View style={{paddingLeft:8}}>
                                            <Text style={{color:"#327FE2", textDecorationLine:'underline'}}>
                                                {item.expirationDate}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                  {this.getActionButton(item)}
                            </Card>
                    )}
                </ScrollView>
              </View>
            </ThemeProvider>
        );
    }
}


const marketMapStateToProps = (state, ownProps) => {
    return {
        userId: state.auth.id,
        myWorkItmes: state.myWorkItmes,
        myCheckItmes: state.myCheckItmes
    };
}

const marketMapDispatchToProps = (dispatch) => {
    return {
        addPlainItems: (items) => { dispatch(addPlainItems(items)); },
        addPlainCheckItems: (items) => { dispatch(addPlainCheckItems(items)); },
        changeCurrent: (itemId) => { dispatch(changeCurrent(itemId)); },
    }
}

export default connect(marketMapStateToProps, marketMapDispatchToProps)(MarketPlace);
