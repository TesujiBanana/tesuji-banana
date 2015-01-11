/*******************************************************************************
 * Copyright (c) 2014 Chris Papazian
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('underscore');

// var Board = require('../models/board.js');

var GridView = require('./grid_view.jsx');
var IntersectionsView = require('./intersections_view.jsx');
var StoneView = require('./stone_view.jsx');


var BoardView = React.createClass({
  propTypes: {
    // gameId: React.PropTypes.string.isRequired
    onIntersectionClick: React.PropTypes.func.isRequired,
    
    // board: React.PropTypes.instanceOf(Board).isRequired,
    // current_turn: React.PropTypes.number,
  },

  render: function() {
    var board_size = this.props.board.board_size;
    return(
      <div className='tesuji-board'>
        <GridView board_size={board_size}>
          <StoneView color='1' x='4' y='4' />        
        </GridView>
      </div>
    );
  }
});

module.exports = BoardView;
