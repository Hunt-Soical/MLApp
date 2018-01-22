import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import React, { Component} from 'react';
import { Dialog, Card } from 'react-native-material-ui';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    bottomButton: {
        height: 50,
        backgroundColor:"green",
        borderRadius: 10,
        marginTop:30,
    },
    bottomText: {
        color:"red",
        textAlign:'center',
        fontSize: 15,
        marginTop:15,
        fontWeight: 'bold'
    },
});

class CheckImageCard extends Component {
    render() {
        return (
          <View style={styles.container}>
          <Card style={{container:{height:300}}}>
            <Image
              style={{flex: 1,}}
              source={{uri: this.props.imgSrc}}
            />
            <View style={styles.bottomButton}>
                <Text style={styles.bottomText}>
                    {this.props.label}
                </Text>
            </View>
          </Card>
          </View>
        );
    }
}

export default CheckImageCard;
