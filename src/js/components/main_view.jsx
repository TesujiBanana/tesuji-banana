'use strict';

var React = require('react');

var RoomView = require('./room_view.jsx');

var MainView = React.createClass({
  render: function() {
    if (this.props.view === 'rooms') {
      return <RoomView room={this.props.viewArgs.roomName} />;
    } else {
      return <div className="col-md-10 main main-viewport">errp</div>;
    }
  }
});

module.exports = MainView;
