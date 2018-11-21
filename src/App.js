import React, { Component } from 'react';
import './App.css';
import PhotosContainer from './containers/PhotosContainer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={PhotosContainer}/>
          <header className="App-header">

           </header>
        </div>
      </Router>
    );
  }
}

export default App;
