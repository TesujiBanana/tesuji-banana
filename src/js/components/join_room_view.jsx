'use strict';

var React = require("react");

var RoomActions = require("../actions/room_actions");

var JoinRoomView = React.createClass({
  getInitialState: function() {
    return { value: '' };
  },
  handleChange: function(event) {
    this.setState({ value: event.target.value });
  },
  onSubmit: function() {
    if (typeof this.state.value == "undefined") { return; }
    if (this.state.value == "") { return }
    
    RoomActions.joinRoom(this.state.value);
  },
  render: function() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <label className="sr-only" htmlFor="inputJoinRoom">Room Name</label>
          <div className="input-group input-group-sm">
            <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" placeholder="room name"/>
            <span className="input-group-btn">
              <input type="submit" value="+" className="btn btn-primary" onClick={this.onSubmit} />
            </span>
          </div>
        </div>
      </form>
    );
  }
});

module.exports = JoinRoomView;
