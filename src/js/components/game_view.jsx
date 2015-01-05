"use strict";

var React = require("react");

var BoardView = require("./goban/board_view.jsx");
var MessageListView = require("./message_list_view.jsx");
var MessageInputView = require("./message_input_view.jsx");

var GameView = React.createClass({
  propTypes: {
    gameId: React.PropTypes.string.isRequired
  },
  _getChannel: function(gameId) {
    // TODO: determine if we should just pass the full path, since it should be the same
    return "/games/" + gameId;
  },
  _handleClick: function(e) {
    console.log(e);
  },
  render: function() {
    var channel = this._getChannel(this.props.gameId);
    var board = { board_size: 19, stones: [] };
    
    return(
      <div className="col-md-10 main main-viewport">
        <div>
          <BoardView
            board={board}
            current_turn={0}
            onIntersectionClick={this._handleClick} />
        </div>
        <div>
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
