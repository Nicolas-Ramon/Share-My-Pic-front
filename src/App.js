import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Connexion from "./components/connexion/Connexion";
import Inscription from "./components/inscription/Inscription";
import Gallery from "./components/gallery/Gallery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: 0,
    };
    this.handleConnexion = this.handleConnexion.bind(this);
    this.handleInscription = this.handleInscription.bind(this);
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

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact>
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
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
