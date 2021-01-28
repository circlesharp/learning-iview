import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './containers/Home';

class App extends React.Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;
