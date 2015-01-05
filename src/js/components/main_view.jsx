'use strict';

var React = require('react');

var GameView = require('./game_view.jsx');
var RoomView = require('./room_view.jsx');

var MainView = React.createClass({
  render: function() {
    console.log(this.props);
    if (this.props.view === 'rooms') {
      return <RoomView room={this.props.viewArgs.roomName} />;
    } else if (this.props.view === 'games') {
      console.log(this.props.viewArgs.gameId);
      return <GameView gameId={this.props.viewArgs.gameId} />;
    } else {
      return <div className="col-md-10 main main-viewport">errp</div>;
    }
  }
});

module.exports = MainView;
