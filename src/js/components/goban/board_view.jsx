var React = require('react');
var Firebase = require("firebase");
var _ = require('underscore');

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
    
    // TODO: alternate ways of determining current move (props? game state?)
    this.currentMoveRef = this.movesRef.orderByKey().limitToLast(1);
    this.currentMoveRef.on("child_added", this._handleMove);
  },
  componentWillUnmount: function() {
    this.currentMoveRef.off("child_added", this._handleMessages);
  },
  _handleMove: function(data, prevData) {
    var currentMove = data.val();
    if (currentMove.previousMoveId && currentMove.previousMoveId === this.state.currentMoveId) {
      var boardHistory = this.state.boardHistory
      var newMove = GoRules.playMove(boardHistory, currentMove);
      if (newMove) {
        var moves = this.state.movesCache;
        moves[data.key()] = currentMove;
        this.setState({ boardHistory: boardHistory.concat(newMove), movesCache: moves });
      }
    } else {
      this.movesRef.once("value", this._handleMoves.bind(this, currentMove));
    }
    
    this.setState({ currentMoveId: data.key() });
  },
  _handleMoves: function(currentMove, data) {
    var moves = data.val();
    var boardHistory = this._parseMoves(currentMove, moves);
    this.setState({ boardHistory: boardHistory, movesCache: moves });
  },
  _parseMoves: function(currentMove, moves) {
    var boardHistory;
    if (currentMove.previousMoveId) {
      boardHistory = this._parseMoves(moves[currentMove.previousMoveId], moves);
    } else {
      boardHistory = [new Board()];
    }
    
    var newMove = GoRules.playMove(boardHistory, currentMove);
    return boardHistory.concat(newMove);
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
    
    var move = _.extend(intersection, { 
      color: board.currentTurn,
      previousMoveId: this.state.currentMoveId || null
    });
    
    if (GoRules.playMove(this.state.boardHistory, move)) {
      MessageActions.createNewMove(this.movesRef, move);
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
