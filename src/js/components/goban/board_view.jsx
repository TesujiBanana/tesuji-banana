var React = require('react');
var Firebase = require("firebase");
var _ = require('underscore');

// var Board = require('../models/board.js');

var GridView = require('./grid_view.jsx');
var IntersectionsView = require('./intersections_view.jsx');
var StoneView = require('./stone_view.jsx');

var MessageActions = require("../../actions/message_actions");
var MessageTypes = require('../../constants/message_types');

// var Move = require('../../models/move.js');
var Stone = require('../../models/stone.js');
var Board = require('../../models/board.js');
var GoRules = require("../../utils/go_rules");


var BoardView = React.createClass({
  propTypes: {
    fbRef: React.PropTypes.instanceOf(Firebase).isRequired
  },
  getInitialState: function() {
    return { boardHistory: [new Board()] };
  },
  componentWillMount: function() {
    this.movesRef = this.props.fbRef.child("moves");
    this.movesRef.on("child_added", this._handleMove);
  },
  componentWillUnmount: function() {
    this.movesRef.off("value", this._handleMessages);
  },
  _handleMove: function(data, prevData) {
    var move = _.pick(data.val(), 'x', 'y', 'color');
    var newBoard = GoRules.playMove(this.state.boardHistory, move);
    if (newBoard) {
      this.setState({ boardHistory: this.state.boardHistory.concat(newBoard) });
    }
  },
  _getRelativePosition: function(position, element) {
    var localRelativePosition = { 
      x: position.x - element.offsetLeft - element.scrollLeft + element.clientLeft,
      y: position.y - element.offsetTop - element.scrollTop + element.clientTop
    };
    
    if (element.offsetParent) {
      return this._getRelativePosition(localRelativePosition, element.offsetParent);
    } else {
      return localRelativePosition;
    }
  },
  _getIntersection: function(position, boardPixelSize, boardSize) { 
    var boardScale = boardPixelSize / 20;
  
    return {
      x: parseInt((position.x - (boardScale / 2)) / boardScale),
      y: boardSize - 1 - parseInt((position.y - (boardScale / 2)) / boardScale)
    };
  },
  _handleClick: function(e) { 
    var position = this._getRelativePosition({x: e.clientX, y: e.clientY}, e.currentTarget);
    var intersection = this._getIntersection(position, e.currentTarget.clientWidth, 19);
    
    var board = this.state.boardHistory[this.state.boardHistory.length - 1];
    var move = _.extend(intersection, { color: board.currentTurn })
    
    if (GoRules.playMove(this.state.boardHistory, move)) {
      MessageActions.createNewMove(this.movesRef, move); //intersection.x, intersection.y, this.state.board.currentTurn);
    }
  },

  render: function() {
    var board = this.state.boardHistory[this.state.boardHistory.length - 1];
    return(
      <div className='tesuji-board' onClick={this._handleClick}>
        <GridView boardSize={board.boardSize}>
          {board.stones.map(function(stone, i) { return <StoneView stone={stone} key={i}/> })}
        </GridView>
      </div>
    );
  }
});

module.exports = BoardView;
