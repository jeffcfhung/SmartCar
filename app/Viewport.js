import React, {Component} from 'react';
import {
    View,
    Text,
    PanResponder,
    Animated,
    Dimensions
} from 'react-native'

import SteerController from './components/steer/index';
import CameraController from './components/camera/index';

var styles = require('./config/styles');

export default class Viewport extends Component {
    constructor(props) {
        super(props);

        this.steerController = new SteerController();
        this.steerController.setName('Steer Control');
        
        this.cameraController = new CameraController();
        this.cameraController.setName('Camera Control');
        // TODO: Play video
        //CarController.getVideo();
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {this.steerController.getView()}
                {this.cameraController.getView()}
            </View>
        );
    }
}
/*
let CIRCLE_RADIUS = 36;
let CIRCLE_OFFSET_Y = 90;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    steerContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    cameraContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS - CIRCLE_OFFSET_Y,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
});
*/