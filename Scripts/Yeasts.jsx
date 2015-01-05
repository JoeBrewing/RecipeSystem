var YeastList = React.createClass({
  render: function() {
    var yeastNodes = this.props.data.map(function (yeast) {
      return (
        <Yeast type={yeast.Type} amount={yeast.Amount} dimension={yeast.Dimension}>
        </Yeast>
      );
    });
    return (
      <div className="container">
	    <div className="row">
	      <table className="yeastList table">
	        <tr>
	          <th>Variety</th>
	          <th>Amount</th>
			  <th>Measurement</th>
	        </tr>
	        {yeastNodes}
	      </table>
        </div>
	  </div>
    );
  }
});

var YeastForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var type = this.refs.type.getDOMNode().value.trim();
    var amount = this.refs.amount.getDOMNode().value.trim();
	var dimension = this.refs.dimension.getDOMNode().value.trim();
    if (!dimension || !amount || !type) {
      return;
    }
    this.props.onYeastSubmit({type: type, amount: amount, dimension: dimension});
    this.refs.type.getDOMNode().value = '';
    this.refs.amount.getDOMNode().value = '';
	this.refs.dimension.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className="yeastForm" onSubmit={this.handleSubmit}>
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

var Yeast = React.createClass({
  render: function() {
	
    return (
	  <tr className="yeast">
        <td>{this.props.type}</td>
        <td>{this.props.amount}</td>
		<td>{this.props.dimension}</td>
	  </tr>
    );
  }
});

var YeastBox = React.createClass({
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

React.render(
  <YeastBox url="/yeasts" submitUrl="/yeasts/new" pollInterval={2000} />,
  document.getElementById('yeast_area')
);
