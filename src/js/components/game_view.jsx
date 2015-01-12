"use strict";

var React = require("react");
var _ = require('underscore');

var BoardView = require("./goban/board_view.jsx");
var MessageListView = require("./message_list_view.jsx");
var MessageInputView = require("./message_input_view.jsx");

var firebaseRef = require("../firebase_connection");

var GameView = React.createClass({
  propTypes: {
    gameId: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return { messages: [] };
  },
  _getRef: function(gameId) {
    return firebaseRef.child("games").child(gameId);
  },
  render: function() {
    var ref = this._getRef(this.props.gameId);
    var messagesRef = ref.child("messages");
    
    return(
      <div className="col-md-10 main main-viewport">
        <div>
          <BoardView fbRef={ref} />
        </div>
        <div className="game-chat-container">
          <MessageListView fbRef={messagesRef} />
          <MessageInputView fbRef={messagesRef} />
        </div>
      </div>
    );
  }
});

module.exports = GameView;
