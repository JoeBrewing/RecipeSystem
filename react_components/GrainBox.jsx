var React = require('react');
var GrainList = require('./GrainList.jsx')
var GrainForm = require('./GrainForm.jsx')

module.exports = React.createClass({
  loadGrainsFromServer: function() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', this.props.url, true);
    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText);
      this.setState({ data: data });
    }.bind(this);
    xhr.send();
  },
  handleGrainSubmit: function(grain) {
    var data = new FormData();
    data.append('Type', grain.type);
    data.append('Amount', grain.amount);
	data.append('Dimension', grain.dimension);

    var xhr = new XMLHttpRequest();
    xhr.open('post', this.props.submitUrl, true);
    xhr.onload = function() {
      this.loadGrainsFromServer();
    }.bind(this);
    xhr.send(data);
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadGrainsFromServer();
    window.setInterval(this.loadGrainsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="grainBox">
        <GrainList data={this.state.data} />
        <GrainForm onGrainSubmit={this.handleGrainSubmit} />
      </div>
    );
  }
});