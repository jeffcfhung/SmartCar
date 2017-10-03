import React, {Component} from 'react';

import Controller from '../controller';

export default class CameraController extends Controller {
    INCREASE_X  = '/camera/increase/x/'
    INCREASE_Y  = '/camera/increase/y/'
    DECREASE_X  = '/camera/decrease/x/'
    DECREASE_Y  = '/camera/decrease/y/'
    HOME        = '/camera/home'

    constructor(props) {
        super(props);
        this.styles = require('./styles');
        this.apiParameters = {
            'x': '0',
            'y': '0',
            'initX': 0,
            'initY': 0,
            'updatedTime': new Date().getTime()
        };

    }

    move(x, y) {
        let toUpdateTime = 300; // milliseconds
        let now = new Date().getTime();
        // Skip sending api if update in short period to avoid overloading
        if (now - this.apiParameters.updatedTime < toUpdateTime) return;
        this.apiParameters.updatedTime = now;

        let xDiff = (x - this.apiParameters.x);

        if (xDiff > 0) {
            this.api.sendCommand(this.INCREASE_X + xDiff);
        }
        else if (xDiff < 0) {
            this.api.sendCommand(this.DECREASE_X + (-xDiff));
        }
        this.apiParameters.x = x;

        let yDiff = (y - this.apiParameters.y);
        if (yDiff > 0) {
            this.api.sendCommand(this.DECREASE_Y + yDiff);
        }
        else if (yDiff < 0) {
            this.api.sendCommand(this.INCREASE_Y + (-yDiff));
        }
        this.apiParameters.y = y;
    }

    stop() {
    }

    handleDoubleClick() {
        this.api.sendCommand(this.HOME);
    }
}
