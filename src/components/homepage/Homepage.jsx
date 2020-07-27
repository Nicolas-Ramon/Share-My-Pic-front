import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "./Homepage.css"

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleClicked } = this.props;
    return (
      <div className="global-homepage" onClick={() => handleClicked(true)}>
        <p className="title-homepage">SHARE MY PIC</p>
      </div>
    );
  }
}

export default Homepage;
