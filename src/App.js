import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Gallery from './components/gallery/Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUtilisateur: 0,
    };
  }

  render() {
    const { idUtilisateur } = this.state;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact>
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
