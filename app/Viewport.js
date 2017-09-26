import React, {Component} from 'react';
import {
    View,
    Text,
    PanResponder,
    Animated,
    Dimensions,
    Image
} from 'react-native'

GLOBAL = require('./lib/globals');
import SteerController from './components/steer';
import CameraController from './components/camera';

let styles = require('./config/styles');

const testVideo = 'http://192.168.1.77:8000/static/images/smart_car_video.jpg';

export default class Viewport extends Component {
    constructor(props) {
        super(props);

        this.steerController = SteerController.Builder()
            .withName('Steer Control')
            .build();

        this.cameraController = CameraController.Builder()
            .withName('Camera Control')
            .build();

        this.state = {
            debugLog: 'Messages',
        }

        this.logs = [];
        // TODO: Play video
        //CarController.getVideo();
    }

    // FIXME: Apply observers instead of direct accesss. This is just quick hacking
    componentDidMount() {
        GLOBAL.CUSTOM_EVENT.ViewPort = this;
        GLOBAL.CUSTOM_EVENT.setDebugLog = this.setDebugLog;
    }

    setDebugLog(log) {
        log = new Date().toISOString().replace(/.*T/, ' ').replace(/Z.*/, ' ') + log;
        let logs = GLOBAL.CUSTOM_EVENT.ViewPort.logs;
        logs.unshift(log);
        if (logs.length > 4) {
            logs.splice(-1,1);
        }
        GLOBAL.CUSTOM_EVENT.ViewPort.setState({debugLog: logs.join('\n')});
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.navBar}>
                    <Text style={styles.navBarButton}>Back</Text>
                    <Text style={styles.navBarHeader}>Smart Car</Text>
                    <Text style={styles.navBarButton}>More</Text>
                </View>
                <View style={styles.content}>
                    <Image
                      style={styles.video}
                      source={{uri: testVideo}}
                    />
                    {this.steerController.getView()}
                    {this.cameraController.getView()}
                </View>
                <View style={styles.tabBar}>
                    <Text style={styles.debugLog}>{this.state.debugLog}</Text>
                </View>
                {/*}
                <View style={styles.tabBar}>
                    <View style={[styles.tabBarButton, styles.button1]} />
                    <View style={[styles.tabBarButton, styles.button2]} />
                    <View style={[styles.tabBarButton, styles.button3]} />
                    <View style={[styles.tabBarButton, styles.button4]} />
                    <View style={[styles.tabBarButton, styles.button5]} />
                </View>
                {*/}
            </View>
        );
    }
}
