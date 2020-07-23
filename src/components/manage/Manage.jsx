import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "./Manage.css";

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    const { title, url } = this.state;
    const { idUser } = this.props;
    const user_id = idUser;
    const correctHour = parseInt(new Date().toISOString().slice(11, 13)) + 2;
    const dateTemp = new Date().toISOString().slice(0, 19);
    const date = dateTemp
      .slice(0, 10)
      .concat(" ", correctHour, dateTemp.slice(13, 19));
    e.preventDefault();
    if (!title || !url) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please provide all fields",
          timer: 3000,
        });
      } else {
    axios
      .post("/picture", { title, url, date, user_id })
      .then((res) => res.data)
      .then((res) => {
        Swal.fire({
            icon: "success",
            title: "Congratulations !",
            text: `The pic has been added`,
            timer: 3000,
          });
      })
      .catch((event) => {
        console.log(event);
        Swal.fire({
            icon: "error",
            title: "Sorry...",
            text: "The server seems offline",
            timer: 3000,
          });
      });
    }
  }

  render() {
    const { title, url } = this.state;
    return (
      <div className="VideoForm container-admin">
        <h2>Manage your pics</h2>
        <form onSubmit={this.submitForm} className="formulaire-connexion">
          <label htmlFor="title" className="label-title-connexion">
            Title of the pic
          </label>
          <input
            className="input-title-connexion"
            type="text"
            name="title"
            value={title}
            onChange={this.onChange}
          />
          <label htmlFor="password" className="label-url-connexion">
            Url of the pic
          </label>
          <input
            className="input-url-connexion"
            type="text"
            name="url"
            value={url}
            onChange={this.onChange}
          />
          <br />

          <input type="submit" className="button-connexion" value="Add pic" />
        </form>
      </div>
    );
  }
}

Manage.propTypes = {
  idUser: PropTypes.number.isRequired,
};

export default Manage;
