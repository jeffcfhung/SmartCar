import React, {Component} from 'react';

import Controller from '../controller';

export default class CameraController extends Controller {
    constructor(props) {
        super(props);
        this.state.styles = require('./styles');
    }

    static Builder() {
        return new CameraController();
    }

    move(x, y) {
        //console.log('Camera: %s %s', x, y);
    }
}
