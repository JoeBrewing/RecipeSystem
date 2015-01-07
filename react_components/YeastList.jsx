var React = require('react');
var Yeast = require('./Yeast.jsx')

module.exports = React.createClass({
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