import React, { Component } from 'react';

// TODO: Move to web socket
export default class CarApi extends Component {
    constructor() {
        super();
        this.baseurl = 'http://localhost:8000';
    }

    getImage() {
        return null;
    }

    sendCommand(cmd) {
        let url = this.baseurl + cmd;
        console.log('Send: %s', url);

        fetch(url)
            .then(this._checkStatus)
            .catch(e => e)
        }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            //console.log(response.status);
        }
        else {
            console.log('[ERROR]' + response.status + ' ' + response.url);
        }
        return response;
    }
}
