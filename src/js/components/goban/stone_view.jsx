"use strict";

var React = require('react');
var _ = require('underscore');

// var Stone = require('../models/stone.js');

var StoneView = React.createClass({
  // propTypes: {
    // stone: React.PropTypes.instanceOf(Stone).isRequired
  // },
  color: function() {
    if (this.props.color === "0" /*Stone.BLACK*/) { return 'black' }
    if (this.props.color === "1" /*Stone.WHITE*/) { return 'white' }
  },
  render: function() {
    console.log(this.props);
    return (
      <div className={'goban-intersection-' + (this.props.x - 1) + '-' + (this.props.y - 1)}>
        <div className={'stone ' + this.color() } />
        <div className='stone shadow' />
      </div>
    );
  }
});

module.exports = StoneView;
