import { View, StyleSheet, Text, Platform } from 'react-native';
import React, { Component } from 'react';
import Color from 'color';
import { NavigationActions } from 'react-navigation';
import { Dialog, Card, DialogDefaultActions, ListItem, Toolbar, COLOR, ThemeProvider, ActionButton, getPlatformElevation, Button } from 'react-native-material-ui';
import { updateItem } from '../action/myworkAction';
import { updateCheckItem } from '../action/mycheckAction';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
import CheckCard from '../component/CheckCard'
import CheckImageCard from '../component/CheckImageCard'
import YoutubeCheckCard from '../component/YoutubeCheckCard'
const timer = require('react-native-timer');
import { mlConfig } from '../config/mlConfig'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomButton: {
        height: 50,
        backgroundColor:"#2A67B1",
    },
    bottomText: {
        color:"#fff",
        textAlign:'center',
        fontSize: 15,
        marginTop:15,
        fontWeight: 'bold'
    },
});

const uiTheme = {

};

class CheckDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            allPosts: [],
            currentPostIndex: 0,
            currentItem: {}
        };
    }

    componentWillMount() {
        //timer.clearInterval("check");
        const { params } = this.props.navigation.state;
        this.setState({currentItem: params.item})
        //this.pullData();
    }

    async pullData() {
        try{
            let response = await fetch(mlConfig.API_HOST+"/api/"+this.state.currentItem.companyCode+"/getNextCheckBatch");
            let result = await response.json();
            posts = result
            this.setState({
                allPosts: posts,
                currentPostIndex: 0
            })
        }catch (err) {
          alert(JSON.stringify(err));
        }
    }

    submitCheckData() {
        postData = this.state.allPosts
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };

        return fetch(mlConfig.API_HOST+"/api/"+this.state.currentItem.companyCode+"/updateCheckData", requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response.statusText);
                }

                return response;
            })
            .then(result => {
                this.setState({
                    allPosts: [],
                    currentPostIndex: 0
                })

                item = this.state.currentItem;
                this.updateMyCheck(item);

                return;
            })
            .catch ((error) => {
                alert(error);
            });
    }

    updateMyCheck(item) {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "userId":this.props.userId, "workId":item.id, "finishTotal":item.finishTotal+20})
                };

                return fetch(mlConfig.API_HOST+'/api/updateMyCheck', requestOptions)
                .then(response => {
                    if (!response.ok) {
                        return Promise.reject(response.statusText);
                    }

                    return response.json();
                })
                .then(result => {
                    this.props.updateCheckItem(item.id, item.finishTotal+20)
                    this.props.myCheckItmes.map((elem) => {
                       if(elem.id == item.id){
                          this.setState({currentItem: elem})
                          return
                       }
                    })
                    return;
                })
                .catch ((error) => {
                    alert("xxxx=="+error);
                });

    };

    getNewCheckBatch() {
        return fetch(mlConfig.API_HOST+"/api/"+this.state.currentItem.companyCode+"/getNextCheckBatch?uId="+this.props.userId+"&count=20")
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response.statusText);
                }

                return response.json();
            })
            .then(result => {
                this.setState({
                    allPosts: result,
                    currentPostIndex: 0
                })

                return;
            })
            .catch ((error) => {
                alert(error);
            });
    }


    cancelCheckData() {
        postData = this.state.allPosts
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };

        return fetch(mlConfig.API_HOST+"/api/"+this.state.currentItem.companyCode+"/cancelCheckData", requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response.statusText);
                }

                return response;
            })
            .then(result => {

                return;
            })
            .catch ((error) => {
                alert(error);
            });
    }


    navigatBack() {
        //timer.clearInterval("check");
        this.cancelCheckData();
        this.props.navigation.dispatch(NavigationActions.back())
    }

    renderItem = () => {
        current = this.state.currentPostIndex;
        dataLen = this.state.allPosts.length;
        currentAction = [{icon: 'close', label: "wrong", name:"0"},{icon: 'check', label: "correct", name:"1"}]

        if(current == 0 && dataLen == 0){
            return (
                    <View style={{flex:1}}>
                    <Toolbar
                        leftElement="arrow-back"
                        onLeftElementPress={() => this.navigatBack()}
                        centerElement={this.state.currentItem.company}
                    />
                    <View style={styles.container}>
                          <Button  primary raised text="Click to get next check batch" onPress={() => this.getNewCheckBatch()} />
                    </View>
                </View>
                );
        }

        if(current >= this.state.currentItem.batchNumber){
            return (
                    <View style={{flex:1}}>
                    <Toolbar
                        leftElement="arrow-back"
                        onLeftElementPress={() => this.navigatBack()}
                        centerElement={this.state.currentItem.company}
                    />
                    <View style={styles.container}>
                        <Card>
                            <View style={{padding: 16, paddingBottom: 16, paddingTop: 20}}>
                              <Text style={{fontWeight:"bold", color:"red"}}>
                                  You have finished this bactch, please to sumit and get next bactch!
                              </Text>
                              <View style={{margin: 8,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'}}>
                                  <Button  primary raised text="Submit Data" onPress={() => this.submitCheckData()} />
                              </View>
                            </View>
                        </Card>
                    </View>
                </View>
                );
        }
        const post = this.state.allPosts[current];
        const postId = post._id

        let WorkCard = null;
        if (this.state.currentItem.type == 1){
          WorkCard = <CheckCard content={post.content} label={post.label} />
        }
        if (this.state.currentItem.type == 2){
          WorkCard = <CheckImageCard imgSrc={post.src} label={post.label} />
        }
        if (this.state.currentItem.type == 3){
          WorkCard = <YoutubeCheckCard videoId={postId} label={post.label} />
        }

        return (
                <View style={{flex:1}}>
                    <Toolbar
                        leftElement="arrow-back"
                        onLeftElementPress={() => this.navigatBack()}
                        centerElement={this.state.currentItem.company}
                    />
                    {WorkCard}
                    <ActionButton
                    actions={currentAction}
                    icon="label"
                    transition="speedDial"
                    onPress={(action) => {
                            if(action !== "main-button"){
                                currAllPost=this.state.allPosts
                                currentIndex = this.state.currentPostIndex
                                currAllPost[currentIndex].check=action
                                currAllPost[currentIndex].checkBy=this.props.userId
                                currentIndex=currentIndex + 1;
                                this.setState({ allPosts: currAllPost,
                                                currentPostIndex: currentIndex})
                            }

                    }}
                    style={{
                        positionContainer: { bottom: 76 },
                        overlayContainer: {backgroundColor: Color('#fff').alpha(0.2).toString()},
                        speedDialActionLabelContainer: {backgroundColor: "#4CD3E2", marginRight: 5, borderRadius:10, height:30, paddingTop:6},
                        speedDialActionIcon: {backgroundColor: '#4CD3E2'},
                        container: {backgroundColor:'#4CD3E2'},
                    }}
                    />
                </View>
        );
    }
    render() {
       // timer.setInterval("check", () => {alert("checking---------")}, 3*1000);
        return (
            <ThemeProvider uiTheme={uiTheme}>
                {this.renderItem()}
            </ThemeProvider>
        );
    }
}

CheckDialog.navigationOptions = {
  header: null
};

const dialogMapStateToProps = (state, ownProps) => {
    return {
        currentId: state.currentItem,
        myCheckItmes: state.myCheckItmes,
        userId: state.auth.id
    };
}

const dialogMapDispatchToProps = (dispatch) => {
    return {
        updateItem: (itemId, finishTotal) => { dispatch(updateItem(itemId, finishTotal)); },
        updateCheckItem: (itemId, finishTotal) => { dispatch(updateCheckItem(itemId, finishTotal)); },
    }
}

export default connect(dialogMapStateToProps, dialogMapDispatchToProps)(CheckDialog);
