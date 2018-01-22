import { View, StyleSheet, Text, Platform } from 'react-native';
import React, { Component } from 'react';
import Color from 'color';
import { NavigationActions } from 'react-navigation';
import { Dialog, Card, DialogDefaultActions, ListItem, Toolbar, COLOR, ThemeProvider, ActionButton, getPlatformElevation, Button } from 'react-native-material-ui';
import { updateItem, addItems, addPlainItems } from '../action/myworkAction';
import { changeCurrent } from '../action/currentItemAction';
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

class QuizDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allQuizPosts: [],
            currentQuizPostIndex: 0,
            currentQuizItem: {}
        };
    }

    componentWillMount() {
      //alert('zaaaaaaaaaa');
        //timer.clearInterval("check");
        const { params } = this.props.navigation.state;
        this.setState({currentQuizItem: params.item}, function(){
          this.pullQuizData();
        })


    }

    async pullQuizData() {
        try{
            //alert(JSON.stringify(this.state.currentQuizItem))
            //alert(JSON.stringify(this.props.navigation.state.params.item))
            let response = await fetch(mlConfig.API_HOST+'/api/'+ this.props.navigation.state.params.item.companyCode +'/getQuizData');
            let result = await response.json();
            posts = result
            //alert(JSON.stringify(posts))
            this.setState({
                allQuizPosts: posts,
                currentQuizPostIndex: 0
            })
        }catch (err) {
          alert(JSON.stringify(err));
        }
    }

    checkData() {
        postData = this.state.allQuizPosts
        correctCount = 0
        this.state.allQuizPosts.map((post) => {
           if(post.label == post.check){
              correctCount = correctCount + 1
           }
        })


        if( correctCount < 14){
           //alert("Sorry, you can not pass the quiz!")
           this.props.navigation.dispatch(NavigationActions.back())
        }else{
           //alert("Congradulations, you have passed the quiz")
           this.updateMywork(this.state.currentQuizItem)
        }

    }

    updateMywork(item) {
              //  alert(JSON.stringify({ "userId":this.props.userId, "workId":item.id}))
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
                    this.navigatBackWhenPass()

                    return;
                })
                .catch ((error) => {
                    alert(error);
                });

    };

    navigatBackWhenPass() {
      Promise.all([
        this.props.navigation.dispatch(
          NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Main',
                }),
            ],
          })
        )
      ]).then(() => this.props.navigation.navigate('CurrentNav'))
    }

    renderItem = () => {
        current = this.state.currentQuizPostIndex;
        dataLen = this.state.allQuizPosts.length;
        currentAction = []
        if(!this.state.currentQuizItem || dataLen == 0){
          return (
                  <View style={{flex:1}}>
                  <Toolbar
                      leftElement="arrow-back"
                      onLeftElementPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                      centerElement={this.state.currentQuizItem.company+"_QUIZ"}
                  />
                  <View style={styles.container}>
                      <Text>Loading ...</Text>
                  </View>
              </View>
              );
        }

        this.state.currentQuizItem.labels.map((label) => {
          currentAction.push({ icon: 'label', label: label, name:label })
        });

        if(current >= this.state.currentQuizItem.batchNumber){
            return (
                    <View style={{flex:1}}>
                    <Toolbar
                        leftElement="arrow-back"
                        onLeftElementPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                        centerElement={this.state.currentQuizItem.company+"_QUIZ"}
                    />
                    <View style={styles.container}>
                        <Card>
                            <View style={{padding: 16, paddingBottom: 16, paddingTop: 20}}>
                              <Text style={{fontWeight:"bold", color:"red"}}>
                                  You have finished this quiz, please to sumit for check!
                              </Text>
                              <View style={{margin: 8,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end'}}>
                                  <Button  primary raised text="Submit for check" onPress={() => this.checkData()} />
                              </View>
                            </View>
                        </Card>
                    </View>
                </View>
                );
        }
        const post = this.state.allQuizPosts[current];
        const postId = post._id

        let WorkCard = null;
        if (this.state.currentQuizItem.type == 1){
          WorkCard = <TagCard content={post.content} />
        }
        if (this.state.currentQuizItem.type == 2){
          WorkCard = <TagImageCard imgSrc={post.src} />
        }
        if (this.state.currentQuizItem.type == 3){
          WorkCard = <YoutubeCard videoId={postId} />
        }

        return (
                <View style={{flex:1}}>
                    <Toolbar
                        leftElement="arrow-back"
                        onLeftElementPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                        centerElement={this.state.currentQuizItem.company + " QUIZ"}
                    />
                    {WorkCard}
                    <ActionButton
                    actions={currentAction}
                    icon="label"
                    transition="speedDial"
                    onPress={(action) => {
                            if(action !== "main-button"){
                                currAllPost=this.state.allQuizPosts
                                currentIndex = this.state.currentQuizPostIndex
                                currAllPost[currentIndex].check=action
                                currentIndex=currentIndex + 1;
                                this.setState({ allQuizPosts: currAllPost,
                                                currentQuizPostIndex: currentIndex})
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

QuizDialog.navigationOptions = {
  header: null
};

const quizMapStateToProps = (state, ownProps) => {
    return {
        myWorkItmes: state.myWorkItmes,
        userId: state.auth.id
    };
}

const quizMapDispatchToProps = (dispatch) => {
    return {
        updateItem: (itemId, finishTotal) => { dispatch(updateItem(itemId, finishTotal)); },
        addPlainItems: (items) => { dispatch(addPlainItems(items)); },
        changeCurrent: (itemId) => { dispatch(changeCurrent(itemId)); },
    }
}

export default connect(quizMapStateToProps, quizMapDispatchToProps)(QuizDialog);
