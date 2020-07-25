import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Navbar from "../navbar/Navbar";
import "./Manage.css";

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      pictures: [],
      isUpdateButton: false,
      idToUpdate: "",
    };
    this.onChange = this.onChange.bind(this);
    this.submitPostPic = this.submitPostPic.bind(this);
    this.deletePic = this.deletePic.bind(this);
    this.updatePic = this.updatePic.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitPostPic(e) {
    const { title, url, isUpdateButton, idToUpdate } = this.state;
    const { idUser } = this.props;
    const user_id = idUser;
    e.preventDefault();
    if (isUpdateButton === false) {
      const correctHour = parseInt(new Date().toISOString().slice(11, 13)) + 2;
      const dateTemp = new Date().toISOString().slice(0, 19);
      const date = dateTemp
        .slice(0, 10)
        .concat(" ", correctHour, dateTemp.slice(13, 19));
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
            this.setState({
              title: "",
              url: "",
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
      axios
        .get("/picture", {
          params: {
            user_id,
          },
        })
        .then((response) => response.data)
        .then((picture) => {
          console.log(picture);
          this.setState({
            pictures: picture,
          });
        });
    } else {
      if (!title || !url) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please provide all fields",
          timer: 3000,
        });
      } else {
        const id = idToUpdate;
        axios
          .put(`/picture/${id}`, { title, url })
          .then((res) => res.data)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Congratulations !",
              text: `The pic has been updated`,
              timer: 3000,
            });
            this.setState({
              title: "",
              url: "",
              isUpdateButton: false
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
      axios
        .get("/picture", {
          params: {
            user_id,
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
  }

  componentDidMount() {
    const { idUser } = this.props;
    const user_id = idUser;
    axios
      .get("/picture", {
        params: {
          user_id,
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

  deletePic(id) {
    const { idUser } = this.props;
    const user_id = idUser;
    axios
      .delete("/picture", {
        params: {
          id,
        },
      })
      .then((response) => response.data)
      .then((picture) => {
        console.log(picture);
        axios
          .get("/picture", {
            params: {
              user_id,
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

  updatePic(title, url, id) {
    this.setState({
      title: title,
      url: url,
      idToUpdate: id,
      isUpdateButton: true,
    });
  }

  render() {
    const { title, url, pictures, isUpdateButton } = this.state;
    return (
      <div className="global-manage">
        <Navbar />
        <h2 className="title-post">Post a new pic</h2>
        <form onSubmit={this.submitPostPic} className="formulaire-manage">
          <label htmlFor="title" className="label-title-manage">
            Title of the pic
          </label>
          <input
            className="input-title-manage"
            type="text"
            name="title"
            value={title}
            onChange={this.onChange}
          />
          <label htmlFor="password" className="label-url-manage">
            Url of the pic
          </label>
          <input
            className="input-url-manage"
            type="text"
            name="url"
            value={url}
            onChange={this.onChange}
          />
          {isUpdateButton === false ? (
            <input type="submit" className="button-manage" value="Add pic" />
          ) : (
            <input type="submit" className="button-manage" value="Update pic" />
          )}
          <hr className="ligne-separation-manage" />
        </form>
        <h2 className="title-manage">Manage your pics</h2>
        {pictures.map((picture) => (
          <div className="one-element-manage">
            <div className="picture-manage">
              <img src={picture.url} alt="One pic" />
            </div>
            <div className="informations-manage">
              <p>{picture.title}</p>
            </div>
            <button
              type="button"
              // key={picture.id}
              onClick={() => this.deletePic(picture.id)}
            >
              Delete
            </button>
            <button
              type="button"
              // key={picture.id}
              onClick={() =>
                this.updatePic(picture.title, picture.url, picture.id)
              }
            >
              Update
            </button>
          </div>
        ))}
      </div>
    );
  }
}

Manage.propTypes = {
  idUser: PropTypes.number.isRequired,
};

export default Manage;
