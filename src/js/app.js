'use strict';

var React = require('react');
var AppView = require('./components/app_view.jsx');

var firebaseRef = new Firebase('https://tesuji-banana.firebaseio.com');
React.render(React.createElement(AppView, { fbRef: firebaseRef }), document.getElementById('viewport'));

module.exports = {};
