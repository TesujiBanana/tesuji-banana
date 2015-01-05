'use strict';

var React = require('react');
// var Stone = require('../models/stone.js');

var StoneView = require('./stone_view.jsx');

var IntersectionView = React.createClass({

  onMouseEnter: function(event) {
    this.props.onMouseEnter({
      x: this.props.x,
      y: this.props.y
    }, event);
  },

  render: function() {
    var contents = [];
    if (this.props.stone) {
      contents.push(<StoneView stone={this.props.stone} key='stone' />);
    }
    else if (this.props.preview) {
      contents.push(<div className={'stone preview ' + this.props.preview } key='preview' />);
    }
    return(
      <div className={'goban-intersection goban-intersection-' + this.props.x + '-' + this.props.y}
        onMouseEnter={this.onMouseEnter}>
        {contents}
      </div>
    )
  }
});


module.exports = IntersectionView;
