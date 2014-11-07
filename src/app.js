'use strict';

var React = require('react');
var AuthView = require('./components/auth_view.jsx');

var firebaseRef = new Firebase('https://tesuji-banana.firebaseio.com');
React.render(React.createElement(AuthView, { fbRef: firebaseRef }), document.getElementById('viewport'));

module.exports = {};
