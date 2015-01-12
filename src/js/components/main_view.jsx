'use strict';

var React = require('react');

var GameView = require('./game_view.jsx');
var RoomView = require('./room_view.jsx');

var MainView = React.createClass({
  render: function() {
    if (this.props.view === 'rooms') {
      return <RoomView roomId={this.props.viewArgs.roomId} />;
    } else if (this.props.view === 'games') {
      return <GameView gameId={this.props.viewArgs.gameId} />;
    } else {
      return <div className="col-md-10 main main-viewport">errp</div>;
    }
  }
});

module.exports = MainView;
