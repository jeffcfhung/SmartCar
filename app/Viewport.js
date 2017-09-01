import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native'

export default class Viewport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY()
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y
      }]),
      onPanResponderRelease: (e, gesture) => {
        console.log('test');
        Animated.spring(
          this.state.pan,
          {toValue:{x:0,y:0}}
        ).start();
      }
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderDraggable()}
      </View>
    );
  }

  renderDraggable() {
    return (
      <View style={styles.draggableContainer}>
        <Animated.View {...this.panResponder.panHandlers} style={[this.state.pan.getLayout(), styles.circle]}>
          <Text style={styles.text}>Control</Text>
        </Animated.View>
      </View>
    );
  }
}
console.log('abc');
let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    dropZone    : {
        height         : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
});
