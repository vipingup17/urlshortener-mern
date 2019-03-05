import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        urls: "",
        status: false
      }
    }

    handleSubmit(event) {
      event.preventDefault();
      // const data = new FormData(event.target);

      const data = new URLSearchParams();
      for (const pair of new FormData(event.target)) {
          data.append(pair[0], pair[1]);
      }
      fetch('/api/item', {
        method: 'POST',
        body: data,
      }).then(response => response.json())
        .then(response => {
          console.log(response);
          {this.setState({ urls: this.state.urls + response.shortUrl + " " })};
        });
    }

    render() {
      const style = this.state.status ? {} : {display:'none'};
      return (
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
                <form onSubmit={this.handleSubmit}>

                  <label htmlFor="shorten"><h4>Enter url to shorten</h4></label>
                  <input id="shorten" name="originalUrl" type="text" />

                  <input id="short" name="shortBaseUrl" type="text" value="http://localhost:5000" style={style} />

                  <button className="btn">Shorten!</button>
                </form>

                <p>Your urls - Please send GET requests to the below urls to go to the original urls</p>
                <p className="urls">{ this.state.urls }</p>
            </div>
          </div>
        </div>
      );
    }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
