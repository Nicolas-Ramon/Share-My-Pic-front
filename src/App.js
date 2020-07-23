import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Gallery from './components/gallery/Gallery';
import Connexion from './components/connexion/Connexion';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUtilisateur: 0,
    };
    this.handleConnexion = this.handleConnexion.bind(this);
  }

  handleConnexion = value => {
    this.setState({
      idUtilisateur: value
    });
  };

  render() {
    const { idUtilisateur } = this.state;
    return (
      <div className="App">
        <Router>
          <Switch>
          <Route path="/" exact>
              <Connexion
                idUtilisateur={this.state.idUtilisateur}
                handleConnexion={this.handleConnexion}
              />
            </Route>
            <Route path="/gallery" exact>
              <Gallery
                idUtilisateur={this.state.idUtilisateur}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
