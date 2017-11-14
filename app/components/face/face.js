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

let GLOBAL = require('../../lib/globals');
let Window = Dimensions.get('window');

export default class FaceRecController extends React.Component {
    FAIL_DELAY = 5000;
    constructor(props) {
        super(props);
        this.state = {
            top:    0,
            left:   0,
            width:  100,
            height: 100
        };

        this.styles = require('./styles');
        this.isFailing = false;
        this.xRatio = Window.width/400.0;
        this.yRatio = Window.height/300.0;
    }

    componentDidMount() {
        this.api = new CarApi();
        // FIXME: This is a hack to do fast prototyping
        this.api.baseurl = GLOBAL.ML_URL + ':5000';
        this.findFacePosition()
        //this.timer = setInterval(this.findFacePosition.bind(this), 1000);
    }

    findFacePosition() {
        const now = new Date().getTime();

        if (this.isFailing) {
            if (this.sendTime && (now - this.sendTime) < this.FAIL_DELAY) {
                console.log('ML connection fallback...');
                return;
            }
        }

        this.api.sendJsonCommand('/',
            this.facePositionFound.bind(this),
            this.errorCallback.bind(this)
        );
        this.sendTime = now;
    }

    errorCallback() {
        this.isFailing = true;
    }

    facePositionFound(responseData) {
        // FIXME: Multiple faces location
        console.log(responseData);
        if (responseData.length > 0) {
            let top = parseInt(responseData[0][0]*this.yRatio);
            let left = parseInt(responseData[0][1]*this.xRatio);
            let height = parseInt(responseData[0][2]*this.yRatio - top);
            let width = parseInt(left - responseData[0][3]*this.xRatio);
            this.setState({
                top: top,
                left: left,
                height: height,
                width: width
            });
            GLOBAL.CUSTOM_EVENT.setDebugLog(
                top + ',' +
                left + ',' +
                height + ',' +
                width
            );
        }
        this.isFailing = false;
        return responseData;
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={[this.styles.container, {top: this.state.top, left: this.state.left}]}>
                <View style={[this.styles.rect, {width: this.state.width, height: this.state.height}]}>
                    <Text style={this.styles.text}>{this.props.name}</Text>
                </View>
            </View>
        );
    }
}
