﻿var React = require('react');

module.exports = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var type = this.refs.type.getDOMNode().value.trim();
    var amount = this.refs.amount.getDOMNode().value.trim();
	var dimension = this.refs.dimension.getDOMNode().value.trim();
	var timeofaddition = this.refs.timeofaddition.getDOMNode().value.trim();
    if (!timeofaddition || !dimension || !amount || !type) {
      return;
    }
    this.props.onHopSubmit({type: type, amount: amount, dimension: dimension, timeofaddition: timeofaddition});
    this.refs.type.getDOMNode().value = '';
    this.refs.amount.getDOMNode().value = '';
	this.refs.dimension.getDOMNode().value = '';
	this.refs.timeofaddition.getDOMNode().value = '';
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
			<div className="col-xs-2">
			  <input type="text" className="form-control" placeholder="Time of Addition" ref="timeofaddition" />
			</div>
            <input type="submit" className="btn btn-default" value="Add" />
		  </div>
		</div>
      </form>
    );
  }
});