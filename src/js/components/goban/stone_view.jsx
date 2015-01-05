"use strict";

var React = require('react');
var _ = require('underscore');

// var Stone = require('../models/stone.js');

var StoneView = React.createClass({
  // propTypes: {
    // stone: React.PropTypes.instanceOf(Stone).isRequired
  // },
  color: function() {
    if (this.props.stone.color === 0 /*Stone.BLACK*/) { return 'black' }
    if (this.props.stone.color === 1 /*Stone.WHITE*/) { return 'white' }
  },
  render: function() {
    return (
      <div>
        <div className={'stone ' + this.color() } />
        <div className='stone shadow' />
      </div>
    );
  }
});

module.exports = StoneView;
