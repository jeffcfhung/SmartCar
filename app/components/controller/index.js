import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    Dimensions
} from 'react-native'

import CarApi from '../../api/car_api'

export default class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
            styles: require('./styles')
        };

        this.api = new CarApi();

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gesture) => {
                this.move(gesture.dx, gesture.dy);
                Animated.event([null, {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y
                }])(e, gesture);
            },
            onPanResponderRelease: (e, gesture) => {
                this.stop()
                Animated.spring(
                    this.state.pan,
                    { toValue:{ x:0, y:0 } }
                ).start();
            }
        });
    }

    withName(name) {
        this._name = name;
        return this;
    }

    build() {
        console.log('build');
        return this;
    }

    getPanHandlers() {
        return this.panResponder.panHandlers;
    }

    getLayout() {
        return this.state.pan.getLayout();
    }

    getView() {
        return (
            <View style={this.state.styles.container}>
                <Animated.View {...this.getPanHandlers()} style={[this.getLayout(), this.state.styles.circle]}>
                    <Text style={this.state.styles.text}>{this._name}</Text>
                </Animated.View>
            </View>
        );
    }

    getVideo() {

    }

    move(x, y) {
        this._NOT_IMPLEMENT_ERROR('move');
    }

    stop() {
        this._NOT_IMPLEMENT_ERROR('stop');
    }

    _NOT_IMPLEMENT_ERROR(func) {
        throw {
            name : "NotImplementedError",
            message : func
                + "() function needs to be implemented in "
                + this.constructor.name
        };
    }
};
