var React = require('react');
var HopList = require('./HopList.jsx')
var HopForm = require('./HopForm.jsx')

module.exports = React.createClass({
  loadHopsFromServer: function() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', this.props.url, true);
    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText);
      this.setState({ data: data });
    }.bind(this);
    xhr.send();
  },
  handleHopSubmit: function(hop) {
    var data = new FormData();
    data.append('Type', hop.type);
    data.append('Amount', hop.amount);
	data.append('Dimension', hop.dimension);
	data.append('TimeOfAddition', hop.timeofaddition);

    var xhr = new XMLHttpRequest();
    xhr.open('post', this.props.submitUrl, true);
    xhr.onload = function() {
      this.loadHopsFromServer();
    }.bind(this);
    xhr.send(data);
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadHopsFromServer();
    window.setInterval(this.loadHopsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="hopBox">
        <HopList data={this.state.data} />
        <HopForm onHopSubmit={this.handleHopSubmit} />
      </div>
    );
  }
});