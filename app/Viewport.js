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

        this.steerController = SteerController.Builder()
            .withName('Steer Control')
            .build();

        this.cameraController = CameraController.Builder()
            .withName('Camera Control')
            .build();

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
