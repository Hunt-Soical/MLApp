import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar, Card, ListItem, Toolbar, ThemeProvider, COLOR, Button, Subheader } from 'react-native-material-ui';

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
                    <Text style={{color:COLOR.black, textDecorationLine:'underline'}}>
                        {keywordItem}
                    </Text>
                </View>
            );
        });
}

const WorkDetailComponent = ({item, navigate}) => (
                <ThemeProvider uiTheme={uiTheme}>
                  <View style={{backgroundColor:"white", flex:1}}>
                    <ListItem
                        leftElement={<Avatar text={item.avatarName} />}
                        centerElement={{
                            primaryText: item.primaryText,
                            secondaryText: item.createDate,
                        }}
                    />
                    <View style={styles.textContainer}>
                        <View style={styles.keywordRowContainer}>
                            <Text style={{color:COLOR.blueA700, fontWeight: 'bold'}}>
                                Description: 
                            </Text>
                            <View style={{flex: 1, paddingLeft:8}}>
                                <Text style={{color:COLOR.black}}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.keywordRowContainer}>
                            <Text style={{color:COLOR.blueA700, fontWeight: 'bold'}}>
                                Keywords: 
                            </Text>
                            {getKeywordItem(item.keywords)}
                        </View>
                        <View style={styles.keywordRowContainer}>
                            <Text style={{color:COLOR.blueA700, fontWeight: 'bold'}}>
                                Reward: 
                            </Text>
                            <View style={{paddingLeft:8}}>
                                <Text style={{color:COLOR.black, textDecorationLine:'underline'}}>
                                    {item.reward}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.keywordRowContainer}>
                            <Text style={{color:COLOR.blueA700, fontWeight: 'bold'}}>
                                Expiration Date: 
                            </Text>
                            <View style={{paddingLeft:8}}>
                                <Text style={{color:COLOR.black, textDecorationLine:'underline'}}>
                                    {item.expirationDate}
                                </Text>
                            </View>
                        </View>
                        <Subheader text="" style={subheaderStyle} />
                        <View style={styles.numRowContainer}>
                            <View style={styles.icon}>
                                <Icon size={40} name="account-balance" color={COLOR.blue400} />
                                <Text>Total</Text>
                                <Text style={{textAlign:"center", color:"black"}}>1000</Text>
                            </View>
                            <View style={styles.icon}>
                                <Icon size={40} name="layers" color={COLOR.blue400} />
                                <Text>Batch</Text>
                                <Text style={{textAlign:"center", color:"black"}}>50</Text>
                            </View>
                            <View style={styles.icon}>
                                <Icon size={40} name="timelapse" color={COLOR.blue400} />
                                <Text>Remind</Text>
                                <Text style={{textAlign:"center", color:"black"}}>25</Text>
                            </View>
                        </View>
                        <Subheader text="" style={subheaderStyle} />
                        <View style={styles.rowContainer}>
                            <View style={styles.button}>
                                <Button  primary raised text="Work" style={buttonStyle} onPress={() => navigate('TagDialog', { item: item })} />
                            </View>
                        </View>
                    </View>
                  </View>
                </ThemeProvider>
);

export default WorkDetailComponent;
