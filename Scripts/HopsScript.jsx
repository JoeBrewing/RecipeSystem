var HopList = React.createClass({
  render: function() {
    var hopNodes = this.props.data.map(function (hop) {
      return (
        <Hop type={hop.Type}>
          {hop.Amount}
        </Hop>
      );
    });
    return (
      <div className="hopList">
        {hopNodes}
      </div>
    );
  }
});

var HopForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var type = this.refs.type.getDOMNode().value.trim();
    var amount = this.refs.amount.getDOMNode().value.trim();
    if (!amount || !type) {
      return;
    }
    this.props.onHopSubmit({type: type, amount: amount});
    this.refs.type.getDOMNode().value = '';
    this.refs.amount.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className="hopForm" onSubmit={this.handleSubmit}>
		<input type="text" placeholder="Variety" ref="type" />
		<input type="text" placeholder="Amount" ref="amount" />
        <input type="submit" value="Add" />
      </form>
    );
  }
});

var Hop = React.createClass({
  render: function() {
	
    return (
      <div className="hop">
        {this.props.type}
        
        {this.props.children}
      </div>
    );
  }
});

var HopBox = React.createClass({
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

React.render(
  <HopBox url="/hops" submitUrl="/hops/new" pollInterval={2000} />,
  document.getElementById('hop_area')
);
