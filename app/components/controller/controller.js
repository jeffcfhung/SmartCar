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
    DOUBLE_CLICK_DELAY = 300;

    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
        };

        this.api = new CarApi();
    }

    handleClick(e) {
        const now = new Date().getTime();
        console.log(now);
        if (this.lastClick && (now - this.lastClick) < this.DOUBLE_CLICK_DELAY)  {
            delete this.lastClick;
            this.handleDoubleClick(e);
        }
        else {
            this.lastClick = now;
        }
    }

    handleDoubleClick() {

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
