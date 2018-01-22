import { View, StyleSheet, Text, ScrollView, TouchableOpacity, PixelRatio } from 'react-native';
import React, { Component} from 'react';
import { Card } from 'react-native-material-ui';
import YouTube from 'react-native-youtube';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    buttonGroup: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    button: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: 'blue',
    },
    buttonTextSmall: {
      fontSize: 15,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    player: {
      alignSelf: 'stretch',
      marginVertical: 10,
    },
});

class YoutubeCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            status: null,
            quality: null,
            error: null,
            isPlaying: false,
            isLooping: true,
            duration: 0,
            currentTime: 0,
            fullscreen: false,
            containerMounted: false,
            containerWidth: null,
        };
    }
    render() {
        return (
          <View style={styles.container} onLayout={({ nativeEvent: { layout: { width } } }) => {
            if (!this.state.containerMounted) this.setState({ containerMounted: true });
            if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
          }}
          >
            <Card style={{container:{height:300}}}>
              <YouTube
                ref={component => {
                  this._youTubeRef = component;
                }}
                videoId={this.props.videoId}
                play={this.state.isPlaying}
                loop={this.state.isLooping}
                fullscreen={this.state.fullscreen}
                controls={1}
                style={[
                  { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) },
                  styles.player,
                ]}
                onError={e => this.setState({ error: e.error })}
                onReady={e => this.setState({ isReady: true })}
                onChangeState={e => this.setState({ status: e.state })}
                onChangeQuality={e => this.setState({ quality: e.quality })}
                onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
                onProgress={e => this.setState({ duration: e.duration, currentTime: e.currentTime })}
              />
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.setState(s => ({ isPlaying: !s.isPlaying }))}
              >
                <Text style={styles.buttonText}>
                  {this.state.status == 'playing' ? 'Pause' : 'Play'}
                </Text>
              </TouchableOpacity>
            </View>
           </Card>
          </View>
        );
    }
}

export default YoutubeCard;
