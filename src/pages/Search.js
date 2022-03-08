import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDesabledButton: true,
      inputSearch: '',
      loading: false,
      result: '',
      data: [],
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

  searchAlbum = () => {
    const { inputSearch, data } = this.state;
    this.setState({ result: inputSearch, inputSearch: '', loading: true }, async () => {
      const arrData = await searchAlbumsAPI(inputSearch);
      this.setState({
        data: [...data, ...arrData],
        loading: false,
      });
    });
  }

  render() {
    const { isDesabledButton, inputSearch, loading, result, data } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? 'Carregando...' : (
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
              onClick={ this.searchAlbum }
            >
              Pesquisar
            </button>
          </form>)}
        {data.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
          <section>
            <p>
              {`Resultado de álbuns de: 
              ${result}`}
            </p>
            <ul>
              {data.map((album) => (
                <li key={ `${album.collectionName} ${album.collectionId}` }>
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <h3>{album.collectionName}</h3>
                  <p>{album.artistName}</p>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    Album
                  </Link>
                </li>))}
            </ul>
          </section>
        )}
      </div>
    );
  }
}

export default Search;
