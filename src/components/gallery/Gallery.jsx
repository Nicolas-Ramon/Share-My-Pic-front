import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
// import PropTypes from 'prop-types';
import "./Gallery.css";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
    };
  }

  componentDidMount() {
    // const { idUtilisateur } = this.props;
    // const utilisateur_id = idUtilisateur;
    axios
      .get("/picture")
      .then((response) => response.data)
      .then((picture) => {
        console.log(picture);
        this.setState({
          pictures: picture,
        });
      });
  }

  render() {
    const { pictures } = this.state;
    // const { idUtilisateur } = this.props;
    return (
      <div className="global-gallery">
        <h2 className="title-gallery">Gallery</h2>
        <hr />
        <Link to="manage" style={{ textDecoration: 'none' }}>
          <p>Go to manage</p>
        </Link>
        <hr />
        {pictures.map((picture) => (
          <div className="one-element-gallery">
            <div className="picture-gallery">
              <img src={picture.url} alt="One pic" />
            </div>
            <div className="informations-gallery">
              <p>{picture.title}</p>
              <p>{picture.date.slice(0, 10)}</p>
              <p>{picture.user_id}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Gallery.propTypes = {};

export default Gallery;
