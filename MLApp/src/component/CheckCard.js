import { View, StyleSheet, Text, ScrollView } from 'react-native';
import React, { Component} from 'react';
import { Card } from 'react-native-material-ui';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomButton: {
        height: 50,
        backgroundColor:"red",
        borderRadius: 10,
        marginTop:30,
    },
    bottomText: {
        color:"#fff",
        textAlign:'center',
        fontSize: 15,
        marginTop:15,
        fontWeight: 'bold'
    },
});

class CheckCard extends Component {
    render() {
        return (
          <ScrollView>
          <View style={styles.container}>
              <Card style={{container: {elevation: 3, backgroundColor:'#0770E6', padding:20, borderRadius:20}}}>
                      <Text style={{color: 'white'}}>
                          {this.props.content}
                      </Text>
                      <View style={styles.bottomButton}>
                          <Text style={styles.bottomText}>
                              {this.props.label}
                          </Text>
                      </View>
              </Card>
          </View>
          </ScrollView>
        );
    }
}

export default CheckCard;
