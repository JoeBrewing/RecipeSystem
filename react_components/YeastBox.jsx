var React = require('react');
var YeastList = require('./YeastList.jsx')
var YeastForm = require('./YeastForm.jsx')

module.exports = React.createClass({
  loadYeastsFromServer: function() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', this.props.url, true);
    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText);
      this.setState({ data: data });
    }.bind(this);
    xhr.send();
  },
  handleYeastSubmit: function(yeast) {
    var data = new FormData();
    data.append('Type', yeast.type);
    data.append('Amount', yeast.amount);
	data.append('Dimension', yeast.dimension);

    var xhr = new XMLHttpRequest();
    xhr.open('post', this.props.submitUrl, true);
    xhr.onload = function() {
      this.loadYeastsFromServer();
    }.bind(this);
    xhr.send(data);
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadYeastsFromServer();
    window.setInterval(this.loadYeastsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="yeastBox">
        <YeastList data={this.state.data} />
        <YeastForm onYeastSubmit={this.handleYeastSubmit} />
      </div>
    );
  }
});