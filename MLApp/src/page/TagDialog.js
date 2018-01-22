import { View, StyleSheet, Text, Platform } from 'react-native';
import React, { Component } from 'react';
import Color from 'color';
import { NavigationActions } from 'react-navigation';
import { Dialog, Card, DialogDefaultActions, ListItem, Toolbar, COLOR, ThemeProvider, ActionButton, getPlatformElevation, Button } from 'react-native-material-ui';
import { updateItem } from '../action/myworkAction';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
import TagCard from '../component/TagCard'
import TagImageCard from '../component/TagImageCard'
import YoutubeCard from '../component/YoutubeCard'
const timer = require('react-native-timer');
import { mlConfig } from '../config/mlConfig'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const uiTheme = {

};

class TagDialog extends Component {
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
            let response = await fetch(mlConfig.API_HOST+"/api/"+this.state.currentItem.companyCode+"/getNextBatch?count="+this.state.currentItem.batchNumber);
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

    submitData() {
        postData = this.state.allPosts
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };

        return fetch(mlConfig.API_HOST+"/api/"+this.state.currentItem.companyCode+"/updateData", requestOptions)
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
                this.updateMywork(item);

                return;
            })
            .catch ((error) => {
                alert(error);
            });
    }

    updateMywork(item) {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "userId":this.props.userId, "workId":item.id, "finishTotal":item.finishTotal+20})
                };

                return fetch(mlConfig.API_HOST+'/api/updateMyWork', requestOptions)
                .then(response => {
                    if (!response.ok) {
                        return Promise.reject(response.statusText);
                    }

                    return response.json();
                })
                .then(result => {
                    this.props.updateItem(item.id, item.finishTotal+20)
                    this.props.myWorkItmes.map((elem) => {
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

    getNewBatch() {
        return fetch(mlConfig.API_HOST+"/api/"+this.state.currentItem.companyCode+"/getNextBatch?count="+this.state.currentItem.batchNumber)
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


    cancelData() {
        postData = this.state.allPosts
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };

        return fetch(mlConfig.API_HOST+"/api/"+this.state.currentItem.companyCode+"/cancelData", requestOptions)
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
        this.cancelData();
        this.props.navigation.dispatch(NavigationActions.back())
    }

    renderItem = () => {
        current = this.state.currentPostIndex;
        dataLen = this.state.allPosts.length;
        currentAction = []
        this.state.currentItem.labels.map((label) => {
          currentAction.push({ icon: 'label', label: label, name:label })
        });
        if(current == 0 && dataLen == 0){
            return (
                    <View style={{flex:1}}>
                    <Toolbar
                        leftElement="arrow-back"
                        onLeftElementPress={() => this.navigatBack()}
                        centerElement={this.state.currentItem.company}
                        style={{centerElementContainer:{marginLeft: 10}}}
                    />
                    <View style={styles.container}>

                          <Button  primary raised text="Click to get next batch" onPress={() => this.getNewBatch()} />
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
                        rightElement=""
                    />
                    <View style={styles.container}>
                        <Card>
                            <View style={{padding: 16, paddingBottom: 16, paddingTop: 20}}>
                              <Text style={{fontWeight:"bold", color:"red"}}>
                                  You have finished this bactch, please to sumit and get next bactch!
                              </Text>
                              <View style={{margin: 8,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end'}}>
                                  <Button  primary raised text="Submit Data" onPress={() => this.submitData()} />
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
          WorkCard = <TagCard content={post.content} />
        }
        if (this.state.currentItem.type == 2){
          WorkCard = <TagImageCard imgSrc={post.src} />
        }
        if (this.state.currentItem.type == 3){
          WorkCard = <YoutubeCard videoId={postId} />
        }

        return (
                <View style={{flex:1}}>
                    <Toolbar
                        leftElement="arrow-back"
                        onLeftElementPress={() => this.navigatBack()}
                        centerElement={this.state.currentItem.company}
                        rightElement=""
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
                                currAllPost[currentIndex].label=action
                                currAllPost[currentIndex].tagBy=this.props.userId
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

TagDialog.navigationOptions = {
  header: null
};

const dialogMapStateToProps = (state, ownProps) => {
    return {
        currentId: state.currentItem,
        myWorkItmes: state.myWorkItmes,
        userId: state.auth.id
    };
}

const dialogMapDispatchToProps = (dispatch) => {
    return {
        updateItem: (itemId, finishTotal) => { dispatch(updateItem(itemId, finishTotal)); },
    }
}

export default connect(dialogMapStateToProps, dialogMapDispatchToProps)(TagDialog);
