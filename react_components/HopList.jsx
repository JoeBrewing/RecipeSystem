var React = require('react');
var Hop = require('~/Scripts/Hops/Hop.jsx')

module.exports = React.createClass({
  render: function() {
    var hopNodes = this.props.data.map(function (hop) {
      return (
        <Hop type={hop.Type} amount={hop.Amount} dimension={hop.Dimension} timeofaddition={hop.TimeOfAddition}>
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
			  <th>Time of Addition</th>
	        </tr>
	        {hopNodes}
	      </table>
        </div>
	  </div>
    );
  }
});