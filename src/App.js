import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Homepage from "./components/homepage/Homepage";
import Connexion from "./components/connexion/Connexion";
import Inscription from "./components/inscription/Inscription";
import Gallery from "./components/gallery/Gallery";
import Manage from "./components/manage/Manage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: 0,
      isClicked: false,
    };
    this.handleConnexion = this.handleConnexion.bind(this);
    this.handleInscription = this.handleInscription.bind(this);
    this.handleClicked = this.handleClicked.bind(this);
  }

  handleConnexion = (value) => {
    this.setState({
      idUser: value,
    });
  };

  handleInscription = (value) => {
    this.setState({
      idUser: value,
    });
  };

  handleClicked = (value) => {
    this.setState({
      isClicked: true
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
          <Route path="/" exact>
              {this.state.isClicked === true ? (
                <Redirect to="/connexion" />
              ) : (
                <Homepage
                isClicked={this.state.isClicked}
                handleClicked={this.handleClicked}
                />
              )}
            </Route>
            <Route path="/connexion" exact>
              <Connexion
                idUser={this.state.idUser}
                handleConnexion={this.handleConnexion}
              />
            </Route>
            <Route path="/inscription" exact>
              <Inscription
                idUser={this.state.idUser}
                handleInscription={this.handleInscription}
              />
            </Route>
            <Route path="/gallery" exact>
              <Gallery idUser={this.state.idUser} />
            </Route>
            <Route path="/manage" exact>
              <Manage idUser={this.state.idUser} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
