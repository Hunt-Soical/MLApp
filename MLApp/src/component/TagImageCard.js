import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import React, { Component} from 'react';
import { Dialog, Card } from 'react-native-material-ui';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

class TagImageCard extends Component {
    render() {
        return (
          <View style={styles.container}>
          <Card style={{container:{height:300}}}>
            <Image
              style={{flex: 1,}}
              source={{uri: this.props.imgSrc}}
            />
          </Card>
          </View>
        );
    }
}

export default TagImageCard;
