import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDesabledButton: true,
      inputSearch: '',
    };
  }

  searchInput = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    }, () => {
      const { inputSearch } = this.state;
      if (inputSearch.replace(' ', '').length >= 2) {
        this.setState({
          isDesabledButton: false,
        });
      } else {
        this.setState({
          isDesabledButton: true,
        });
      }
    });
  }

  render() {
    const { isDesabledButton, inputSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ inputSearch }
            name="inputSearch"
            onChange={ this.searchInput }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDesabledButton }
          >
            Pesquisar
          </button>
        </form>
        <p>Estou no Search</p>
      </div>
    );
  }
}

export default Search;
