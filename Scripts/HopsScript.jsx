var HopList = React.createClass({
  render: function() {
    var hopNodes = this.props.data.map(function (hop) {
      return (
        <Hop type={hop.Type} amount={hop.Amount} dimension={hop.Dimension}>
        </Hop>
      );
    });
    return (
      <div className="container">
	    <div className="row">
	      <table className="hopList table">
	        <tr>
	          <th>Variety</th>
	          <th>Amount</th>
			  <th>Measurement</th>
	        </tr>
	        {hopNodes}
	      </table>
        </div>
	  </div>
    );
  }
});

var ClearForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    
    return;
  },
  render: function() {
    return (
      <form className="clearForm" onSubmit={this.handleSubmit}>
	    <div className="container">
		  <div className="row">
            <input type="submit" className="btn btn-default" value="Clear the Hops List" />
		  </div>
		</div>
      </form>
    );
  }
});

var HopForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var type = this.refs.type.getDOMNode().value.trim();
    var amount = this.refs.amount.getDOMNode().value.trim();
	var dimension = this.refs.dimension.getDOMNode().value.trim();
    if (!dimension || !amount || !type) {
      return;
    }
    this.props.onHopSubmit({type: type, amount: amount, dimension: dimension});
    this.refs.type.getDOMNode().value = '';
    this.refs.amount.getDOMNode().value = '';
	this.refs.dimension.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className="hopForm" onSubmit={this.handleSubmit}>
	    <div className="container">
		  <div className="row">
		    <div className="col-xs-4">
		      <input type="text" className="form-control" placeholder="Variety" ref="type" />
			</div>
			<div className="col-xs-2">
		      <input type="text" className="form-control" placeholder="Amount" ref="amount" />
			</div>
			<div className="col-xs-2">
			  <select className="form-control" ref="dimension"><option>Ounces</option><option>Pounds</option></select>
			</div>
            <input type="submit" className="btn btn-default" value="Add" />
		  </div>
		</div>
      </form>
    );
  }
});

var Hop = React.createClass({
  render: function() {
	
    return (
	  <tr className="hop">
        <td>{this.props.type}</td>
        <td>{this.props.amount}</td>
		<td>{this.props.dimension}</td>
	  </tr>
    );
  }
});

var ClearBox = React.createClass({
  handleClearSubmit: function() {
	var xhr = new XMLHttpRequest();
    xhr.open('post', this.props.submitUrl, true);
    
    xhr.send();
  },
  render: function() {
    return (
      <div className="clearBox">
        <ClearForm onHopSubmit={this.handleClearSubmit} />
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
	data.append('Dimension', hop.dimension);

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
  <ClearBox url="/hops" submitUrl="/hops/clearhops" pollInterval={2000} />,
  <HopBox url="/hops" submitUrl="/hops/new" pollInterval={2000} />,
  document.getElementById('hop_area')
);
