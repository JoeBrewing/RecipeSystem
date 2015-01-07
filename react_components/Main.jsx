var React = require('react');
var HopBox = require('./HopBox.jsx')
var GrainBox = require('./GrainBox.jsx')
var YeastBox = require('./YeastBox.jsx')

var MainBox = React.createClass({
  render: function() {
    return (
      <div className="mainBox">
        <div className="container-fluid">
          <div className="row">
              <div className="col-xs-11">
                  <div className="well">
                      <h3>Hops</h3>
                      <span className="help-block">Enter the hop type, amount, and time of addition then click submit.</span>
                      <div className="form-group">
						<HopBox url="/hops" submitUrl="/hops/new" pollInterval={2000} />;
                      </div>
                  </div>
              </div>
          </div>
		  <div className="row">
              <div className="col-xs-11">
                  <div className="well">
                      <h3>Grains</h3>
                      <span className="help-block">Enter the grain type, and amount then click submit.</span>
                      <div className="form-group">
						<YeastBox url="/grains" submitUrl="/grains/new" pollInterval={2000} />;
                      </div>
                  </div>
              </div>
          </div>
		  <div className="row">
              <div className="col-xs-11">
                  <div className="well">
                      <h3>Yeasts</h3>
                      <span className="help-block">Enter the yeast type, and amount then click submit.</span>
                      <div className="form-group">
						<YeastBox url="/yeasts" submitUrl="/yeasts/new" pollInterval={2000} />;
                      </div>
                  </div>
              </div>
          </div>
	    </div>
      </div>
      
    );
  }
});

React.render(
  <MainBox />,
  document.getElementById('main_area')
);