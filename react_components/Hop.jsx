var React = require('react');

module.exports = React.createClass({
  render: function() {
	
    return (
	  <tr className="hop">
        <td>{this.props.type}</td>
        <td>{this.props.amount}</td>
		<td>{this.props.dimension}</td>
		<td>{this.props.timeofaddition}</td>
	  </tr>
    );
  }
});