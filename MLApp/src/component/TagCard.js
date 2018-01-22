import { View, StyleSheet, Text, ScrollView } from 'react-native';
import React, { Component} from 'react';
import { Card } from 'react-native-material-ui';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

class TagCard extends Component {
    render() {
        return (
          <ScrollView>
          <View style={styles.container}>
              <Card style={{container: {elevation: 3, backgroundColor:'#0770E6', padding:20, borderRadius:20}}}>
                      <Text style={{color: 'white'}}>
                          {this.props.content}
                      </Text>
              </Card>
          </View>
          </ScrollView>
        );
    }
}

export default TagCard;
