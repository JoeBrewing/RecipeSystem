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
                          <HopBox url="/hops" submitUrl="/hops/new" pollInterval={2000} />
                      </div>
                      <script src="@Url.Content("~/Scripts/Hops.jsx")"></script>
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