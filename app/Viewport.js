import React, {Component} from 'react';
import {
    View,
    Text,
    PanResponder,
    Animated,
    Dimensions,
    Image,
    WebView
} from 'react-native'

GLOBAL = require('./lib/globals');
import SteerController from './components/steer';
import CameraController from './components/camera';

let styles = require('./config/styles');

const testVideo = GLOBAL.BASE_URL + ':8080/?action=stream';

export default class Viewport extends Component {
    constructor(props) {
        super(props);

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

    formatHtml() {
        return ('<html><body><img src="' + testVideo + '" width="100%" style="background-color: white; min-height: 100%; min-width: 100%; position: fixed; top: 0; left: 0;"></body></html>');
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
                    <WebView
                       style={styles.video}
                       automaticallyAdjustContentInsets={true}
                       scalesPageToFit={true}
                       startInLoadingState={false}
                       scrollEnabled={false}
                       source={{html: this.formatHtml(), baseUrl: '/'}} />
                    <CameraController name='Camera Control' />
                    <SteerController name='Steer Control' />
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
