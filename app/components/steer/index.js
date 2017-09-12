import React, {Component} from 'react';

import Contoller from '../controller/index';

export default class SteerController extends Contoller {
    constructor(props) {
        super(props);
        this._styles = require('./styles');
    }
}
