import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
// import PropTypes from 'prop-types';
import Navbar from "../navbar/Navbar";
import Heart from "../img/heart2.png";
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
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
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

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onClick(user, picture) {
    const { author, title } = this.state;
    const name = author;
    axios
      .get("/favorite", {
        params: {
          user,
          picture,
        },
      })
      .then((response) => response.data)
      .then((test) => {
        if (test) {
          axios
            .delete("/favorite", {
              params: {
                user,
                picture,
              },
            })
            .then((response) => response.data)
            .then((del) => {
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
            });
        }
      })
      .catch((error) => {
        axios
          .post("/favorite", { user, picture })
          .then((response) => response.data)
          .then((add) => {
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
          });
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
    const { idUser } = this.props;
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
              <img className="pic-gallery" src={picture.url} alt="One pic" />
              <div
                className="heart-like-gallery"
                onClick={() => this.onClick(idUser, picture.id)}
              >
                <img src={Heart} alt="Heart pic" />
                <p>{picture.nblike}</p>
              </div>
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
