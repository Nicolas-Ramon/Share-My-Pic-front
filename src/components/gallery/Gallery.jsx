import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
// import PropTypes from 'prop-types';
import Navbar from "../navbar/Navbar";
// import Fond from "../img/fond.jpg";
import "./Gallery.css";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      author: "",
      title: "",
    };
    this.onChange = this.onChange.bind(this);
    this.searchForm = this.searchForm.bind(this);
  }

  componentDidMount() {
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

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  searchForm(e) {
    e.preventDefault();
    const { author, title } = this.state;
    const name = author;
    axios
      .get("/picture", {
        params: {
          name,
          title,
        },
      })
      .then((response) => response.data)
      .then((picture) => {
        console.log(picture);
        this.setState({
          pictures: picture,
        });
      });
  }

  render() {
    const { pictures, author, title } = this.state;
    return (
      <div className="global-gallery">
        <Navbar />
        <h2 className="title-gallery">Gallery</h2>
        <hr />
        <form onSubmit={this.searchForm} className="formulaire-search-gallery">
          <label htmlFor="author" className="label-author-gallery">
            Author: 
            <input
              className="input-author-gallery"
              type="text"
              name="author"
              value={author}
              onChange={this.onChange}
            />
          </label>
          <label htmlFor="title" className="label-title-gallery">
            Title: 
            <input
              className="input-title-gallery"
              type="text"
              name="title"
              value={title}
              onChange={this.onChange}
            />
          </label>
          <input
            type="submit"
            className="button-search-gallery"
            value="Search"
          />
        </form>
        {pictures.map((picture) => (
          <div className="one-element-gallery">
            <div className="picture-gallery">
              <img src={picture.url} alt="One pic" />
            </div>
            <div className="informations-gallery">
              <p>Date : {picture.date.slice(0, 10)}</p>
              <p>Author : {picture.name}</p>
              <p>{picture.title}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Gallery.propTypes = {};

export default Gallery;
