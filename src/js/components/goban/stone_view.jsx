"use strict";

var React = require('react');
var _ = require('underscore');

var Stone = require('../../models/stone.js');

var StoneView = React.createClass({
  propTypes: {
    stone: React.PropTypes.instanceOf(Stone).isRequired
  },
  color: function() {
    if (this.props.stone.color === Stone.BLACK) { return 'black' }
    if (this.props.stone.color === Stone.WHITE) { return 'white' }
  },
  render: function() {
    return (
      <div className={'goban-intersection goban-intersection-' + (this.props.stone.x) + '-' + (this.props.stone.y)}>
        <div className={'stone ' + this.color() } />
        <div className='stone shadow' />
      </div>
    );
  }
});

module.exports = StoneView;
