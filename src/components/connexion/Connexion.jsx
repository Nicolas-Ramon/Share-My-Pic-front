import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "./Connexion.css";

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      password: "",
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
    const { handleConnexion } = this.props;
    e.preventDefault();
    const { mail, password } = this.state;
    if (!mail || !password) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please provide all fields",
        timer: 3000,
      });
    } else {
      const url = "/connexion";
      axios
        .post(url, { mail, password })
        .then((res) => res.data)
        .then((res) => {
          console.log(res.id);
          Swal.fire({
            icon: "success",
            title: "Share My Pic",
            text: `Welcome ${res.name}!`,
            timer: 3000,
          });
          handleConnexion(res.id);
        })
        .catch((error) => {
          console.log("Error:", error);
          if (error == "Error: Request failed with status code 404") {
            Swal.fire({
              icon: "warning",
              title: "Oops...",
              text: "Invalid mail or password",
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
    const { mail, password } = this.state;
    const { idUtilisateur } = this.props;
    return (
      <div className="global-connexion">
        <h2 className="title-connexion">Log in</h2>
        <br />
        <form onSubmit={this.submitForm} className="formulaire-connexion">
          <label htmlFor="mail" className="label-mail-connexion">
            Email
          </label>
          <input
            className="input-mail-connexion"
            type="email"
            name="mail"
            value={mail}
            onChange={this.onChange}
          />
          <label htmlFor="password" className="label-password-connexion">
            Password
          </label>
          <input
            className="input-password-connexion"
            type="password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
          {/* <br /> */}
          {idUtilisateur === 0 ? (
            <input
              type="submit"
              className="button-connexion"
              value="Se connecter"
            />
          ) : (
            <Redirect to="/gallery" />
          )}
        </form>
        <hr className="ligne-separation-connexion" />

        <div className="new-user-connexion">
          <p>New user ?</p>
          <Link to="/Utilisateur">
            <p className="link-to-new-user-conexion">Sign in</p>
          </Link>
        </div>
      </div>
    );
  }
}

Connexion.propTypes = {
  handleConnexion: PropTypes.func.isRequired,
  idUtilisateur: PropTypes.number.isRequired,
};

export default Connexion;
