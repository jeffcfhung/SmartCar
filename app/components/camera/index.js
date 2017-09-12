import React, {Component} from 'react';

import Controller from '../controller/index';

export default class CameraController extends Controller {
    constructor(props) {
        super(props);
        this._styles = require('./styles');
    }
}

