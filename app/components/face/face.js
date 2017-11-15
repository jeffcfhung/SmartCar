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

        // This ratio comes from mapping of image pixels and display area
        this.xRatio = 400.0/640.0;
        this.yRatio = 300.0/480.0;
    }

    componentDidMount() {
        this.api = new CarApi();
        // FIXME: This is a hack to do fast prototyping
        this.api.baseurl = GLOBAL.ML_URL + ':5000';
        this.findFacePosition()
        this.timer = setInterval(this.findFacePosition.bind(this), 1000);
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
        /*
        The node coordiation is (y1, x1, y2, x2)
        We need to trasfer them to hight and width per ratio
        (y-0)/300 = (y1-0)/480 => y = y1*300/480 = y1*this.yRatio
        (x-0)/400 = (x1-0)/640 => x = x1*400/640 = x1*this.xRatio
        height = (y2-y1)*this.yRatio
        width = (x2-x1)*this.xRatio
        */

        if (responseData.length > 0) {
            const node = responseData[0];
            const top = parseInt(node[0]*this.yRatio);
            const left = parseInt(node[1]*this.xRatio);
            const height = parseInt((node[2]-node[0])*this.yRatio);
            const width = parseInt((node[3]-node[1])*this.xRatio);
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
