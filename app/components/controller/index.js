import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    Dimensions
} from 'react-native'

export default class Controller extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pan: new Animated.ValueXY()
        };
        
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gesture) => {
                //console.log(e, gesture);
                //console.log(gesture.dx + '/' + gesture.dy);
                //this.moveCamera(gesture.dx, gesture.dy);
                Animated.event([null, {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y
                }])(e, gesture);
            },
            onPanResponderRelease: (e, gesture) => {
                console.log(e, gesture);
                Animated.spring(
                    this.state.pan,
                    {toValue:{x:0,y:0}}
                ).start();
            }
        });
    }
    
    setName(name) {
        this._name = name;
        console.log(this._name);
    }
    
    getPanHandlers() {
        return this.panResponder.panHandlers;
    }
    
    getLayout() {
        return this.state.pan.getLayout();
    }
    
    getView() {
        return (
            <View style={this._styles.container}>
                <Animated.View {...this.getPanHandlers()} style={[this.getLayout(), this._styles.circle]}>
                    <Text style={this._styles.text}>{this._name}</Text>
                </Animated.View>
            </View>
        );
    }
    
    getVideo() {
        
    }
    
    moveCamera(x, y) {
        //console.log(x + '/' + y);
    }
    
    moveCar(x, y) {
        
    }
};

/*
let CIRCLE_RADIUS = 36;
let CIRCLE_OFFSET_Y = 90;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    container: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    text: {
        marginTop   : 20,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    circle: {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
});
*/