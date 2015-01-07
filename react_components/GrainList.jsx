var React = require('react');
var Grain = require('./Grain.jsx')

module.exports = React.createClass({
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