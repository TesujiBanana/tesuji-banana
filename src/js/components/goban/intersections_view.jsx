'use strict';

var React = require('react');
var _ = require('underscore');

// var Stone = require('../models/stone.js');
var GoRules = require("../../utils/go_rules");

var IntersectionView = require('./intersection_view.jsx');

var IntersectionsView = React.createClass({
  getInitialState: function() {
    return {
      cursor_position: {
        x: 7,
        y: 8
      }
    }
  },

  onClick: function(event) {
    this.props.onIntersectionClick({
      x: this.state.cursor_position.x,
      y: this.state.cursor_position.y
    }, event);
  },

  onIntersectionEnter: function(payload, event) {
    this.setState({
      cursor_position: {
        x: payload.x,
        y: payload.y
      }
    });
  },

  render: function() {
    var boardSize = 19;
    return (
      <div className='goban-intersections' onClick={this.onClick}>
        {_.times( boardSize * boardSize, function(i) {
          var x = i % boardSize;
          var y = (i - x) / boardSize;
          var stone = GoRules.stoneAt(this.props.board, x, y);
          console.log(stone);
          // var preview = (this.state.cursor_position.x === x && this.state.cursor_position.y === y) ?
            // (this.props.current_turn === Stone.BLACK ? 'black' : 'white' ):
            // undefined;

          return (
            <IntersectionView x={x} y={y} key={i}
              onMouseEnter={this.onIntersectionEnter}
              stone={stone} />
              // preview={preview} />
          )
        }.bind(this))}
      </div>
    );
  }
});

module.exports = IntersectionsView;
