import React, { Component } from 'react';

GLOBAL = require('../lib/globals');

// TODO: Move to web socket
export default class CarApi extends Component {
    constructor(props) {
        super(props);
        this.baseurl = 'http://localhost:8000';
    }

    getImage() {
        return null;
    }

    sendCommand(cmd) {
        let url = this.baseurl + cmd;

        this.fetchTimeout(1000, fetch(url))
            .then(this._checkStatus)
            .catch(e => {
                GLOBAL.CUSTOM_EVENT.setDebugLog(e.toString());
            })
    }

    fetchTimeout(ms, promise) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                reject(new Error('Response timeout'));
            }, ms)

            promise.then(resolve, reject);
        })
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            //console.log(response.status);
        }
        else {
            console.log('[ERROR]' + response.status + ' ' + response.url);
        }
        // FIXME: Event observers
        GLOBAL.CUSTOM_EVENT.setDebugLog(response.status + '-' + response.url);
        return response;
    }
}
