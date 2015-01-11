"use strict";

var React = require("react");
var _ = require('underscore');

var BoardView = require("./goban/board_view.jsx");
var MessageListView = require("./message_list_view.jsx");
var MessageInputView = require("./message_input_view.jsx");

var MessageActions = require("../actions/message_actions");
var MessageTypes = require('../constants/message_types');

var firebaseRef = require("../firebase_connection");

var GoRules = require("../utils/go_rules");

var GameView = React.createClass({
  propTypes: {
    gameId: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return { messages: [] };
  },
  componentWillMount: function() {
    var channel = this._getChannel(this.props.gameId);
    this.movesRef = this._getMovesRef(channel);
    this.movesRef.on("value", this._handleMessages);
  },
  componentWillUnmount: function() {
    this.movesRef.off("value", this._handleMessages);
  },
  _getMovesRef: function(channel) {
    return firebaseRef
      .child("channels")
      .child(channel)
      .child("messages")
      .orderByChild('type')
      .equalTo(MessageTypes.MOVE);
  },
  _handleMessages: function(dataSnapshot) {
    // this.setState({ moves: _.keys(dataSnapshot.val()) });
    // console.log(dataSnapshot.val());
    var moves = _.map(dataSnapshot.val(), function(message, key) {
      return _.pick(message, 'x', 'y', 'color');
    });
    
    // var game = { moves: moves };
    var initialBoard = { board_size: 19, stones: [] };
    console.log(GoRules.getBoard([initialBoard], moves));
    
    // this.setState({ moves: moves });
  },

  _getChannel: function(gameId) {
    // TODO: determine if we should just pass the full path, since it should be the same
    return "/games/" + gameId;
  },
  _handleClick: function(e) {
    var channel = this._getChannel(this.props.gameId);
    MessageActions.createMoveMessage(channel, this.props.gameId, e.x, e.y);
  },
  render: function() {
    var channel = this._getChannel(this.props.gameId);
    var board = { board_size: 19, stones: [] };
    
    return(
      <div className="col-md-10 main main-viewport">
        <div>
          <BoardView
            gameId={this.props.gameId}
            board={board}
            current_turn={0}
            onIntersectionClick={this._handleClick} />
        </div>
        <div className="game-chat-container">
          <MessageListView channel={channel} key={channel}/>
          <MessageInputView channel={channel} />
        </div>
      </div>
    );
    
    // <BoardView
    //   board={this.props.game.board()}
    //   current_turn={this.props.game.current_turn}
    //   onIntersectionClick={this.handleClick} />
  }
});

module.exports = GameView;
