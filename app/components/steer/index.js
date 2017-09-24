import React, {Component} from 'react';

import Controller from '../controller/index';

export default class SteerController extends Controller {
    FORWARD = '/motor/forward';
    BACKWARD = '/motor/backward';
    STOP = '/motor/stop';
    TURNING = '/turning/';
    SPEED = '/motor/set/speed/';

    constructor(props) {
        super(props);
        this.state.styles = require('./styles');
        // initial state
        this.state.apiContext = {
            'speed': '0',
            'direction': this.STOP,
            'turningAngle': '127', // Center
            'updatedTime': new Date().getTime()
        }
    }

    static Builder() {
        return new SteerController();
    }

    move(x, y) {
        let toUpdateTime = 500; // milliseconds
        let now = new Date().getTime();
        // Skip sending api if update in short period to avoid overloading
        if (now - this.state.updatedTime < toUpdateTime) return;
        this.state.updatedTime = now;

        this._changeDirection(y);
        this._changeSpeed(x, y);
        this._changeTurning(x);
    }

    stop() {
        this._changeDirection(0);
        this._changeSpeed(0, 0);
        this._changeTurning(0);
    }

    _changeDirection(y) {
        let direction = y < 0 ? this.FORWARD : (y > 0 ? this.BACKWARD : this.STOP);
        if (this.state.apiContext.direction == direction) return;

        this.state.apiContext.direction = direction;
        this.api.sendCommand(direction);
    }

    _changeSpeed(x, y) {
        let speed = Math.round(Math.sqrt(x*x + y*y));
        speed = speed > 100 ? 100 : (speed < 0 ? 0 : speed);
        if (this.state.apiContext.speed == speed) return;

        this.state.apiContext.speed = speed;
        this.api.sendCommand(this.SPEED + speed);
    }

    _changeTurning(x) {
        let angle = Math.round((x - (-200)) / 400 * 255);
        angle = angle > 255 ? 255 : (angle < 0 ? 0 : angle);
        if (this.state.apiContext.turningAngle == angle) return;

        this.state.apiContext.turningAngle = angle;
        this.api.sendCommand(this.TURNING + angle);
    }
}
