import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "./Inscription.css";

class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mail: "",
      password: "",
      password2: "",
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
    const { handleInscription } = this.props;
    e.preventDefault();
    const { name, mail, password, password2 } = this.state;
    if (!name || !mail || !password || !password2) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please provide all fields",
        timer: 3000,
      });
    } else if (password !== password2) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Passwords must be identicals",
        timer: 3000,
      });
    } else {
      const url = "/inscription";
      axios
        .post(url, { name, mail, password })
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Share My Pic",
            text: `Welcome ${res.name}!`,
            timer: 3000,
          });
          handleInscription(res.id);
        })
        .catch((error) => {
          console.log("Error:", error);
          if (error == "Error: Request failed with status code 409") {
            Swal.fire({
              icon: "warning",
              title: "Oops...",
              text: "Mail allready used",
              timer: 3000,
            });
          } else if (error == "Error: Request failed with status code 500") {
            Swal.fire({
              icon: "error",
              title: "Sorry...",
              text: "The server seems offline",
              timer: 3000,
            });
          }
        });
    }
  }

  render() {
    const { name, mail, password, password2 } = this.state;
    const { idUser } = this.props;
    return (
      <div className="global-inscription">
        <h2 className="title-inscription">Sign up</h2>
        <br />
        <form onSubmit={this.submitForm} className="formulaire-inscription">
          <label htmlFor="name" className="label-name-inscription">
            Name
          </label>
          <input
            className="input-name-inscription"
            type="text"
            name="name"
            onChange={this.onChange}
            value={name}
          />
          <label htmlFor="mail" className="label-mail-inscription">
            Email
          </label>
          <input
            className="input-mail-inscription"
            type="email"
            name="mail"
            onChange={this.onChange}
            value={mail}
          />
          <label htmlFor="password" className="label-password-inscription">
            Password
          </label>
          <input
            className="input-password-inscription"
            type="password"
            name="password"
            onChange={this.onChange}
            value={password}
          />
          <label htmlFor="password2" className="label-password2-inscription">
            Confirm password
          </label>
          <input
            className="input-password2-inscription"
            type="password"
            name="password2"
            onChange={this.onChange}
            value={password2}
          />
          {idUser === 0 ? (
            <input
              type="submit"
              className="button-connexion"
              value="Log in"
            />
          ) : (
            <Redirect to="/gallery" />
          )}
        </form>
      </div>
    );
  }
}

Inscription.propTypes = {
  handleInscription: PropTypes.func.isRequired,
  idUser: PropTypes.number.isRequired,
};

export default Inscription;
