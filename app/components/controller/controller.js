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
import styles from './styles'

export default class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
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

    render() {
        return (
            <View style={this.styles.container}>
                <Animated.View {...this.panResponder.panHandlers}
                        style={[this.state.pan.getLayout(), this.styles.circle]}>
                    <Text style={this.styles.text}>{this.props.name}</Text>
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
