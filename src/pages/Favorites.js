import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>EStou no Favorites</p>
      </div>
    );
  }
}

export default Favorites;
