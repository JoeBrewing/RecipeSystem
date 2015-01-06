var GrainList = React.createClass({
  render: function() {
    var grainNodes = this.props.data.map(function (grain) {
      return (
        <Grain type={grain.Type} amount={grain.Amount} dimension={grain.Dimension}>
        </Grain>
      );
    });
    return (
      <div className="container">
	    <div className="row">
	      <table className="grainList table">
	        <tr>
	          <th>Variety</th>
	          <th>Amount</th>
			  <th>Measurement</th>
	        </tr>
	        {grainNodes}
	      </table>
        </div>
	  </div>
    );
  }
});

var GrainForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var type = this.refs.type.getDOMNode().value.trim();
    var amount = this.refs.amount.getDOMNode().value.trim();
	var dimension = this.refs.dimension.getDOMNode().value.trim();
    if (!dimension || !amount || !type) {
      return;
    }
    this.props.onGrainSubmit({type: type, amount: amount, dimension: dimension});
    this.refs.type.getDOMNode().value = '';
    this.refs.amount.getDOMNode().value = '';
	this.refs.dimension.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className="grainForm" onSubmit={this.handleSubmit}>
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

var Grain = React.createClass({
  render: function() {
	
    return (
	  <tr className="grain">
        <td>{this.props.type}</td>
        <td>{this.props.amount}</td>
		<td>{this.props.dimension}</td>
	  </tr>
    );
  }
});

var GrainBox = React.createClass({
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


