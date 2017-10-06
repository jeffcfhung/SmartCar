'use strict'
const React = require('react-native')
import {
    StyleSheet,
    Dimensions
} from 'react-native';

let CIRCLE_RADIUS = 36;
let CIRCLE_OFFSET_Y = 90;
let Window = Dimensions.get('window');
let Y_OFFSET = 100;
module.exports = StyleSheet.create({
    container: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS - Y_OFFSET,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    text: {
        marginTop   : 20,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    circle: {
        backgroundColor     : '#8a9c3c',
        opacity             : 0.7,
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
})
