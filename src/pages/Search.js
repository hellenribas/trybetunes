import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import videos from './css/videos/Girl - 29313.mp4';
import './css/search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDesabledButton: true,
      inputSearch: '',
      loading: false,
      result: '',
      data: [],
      video: true,
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

  searchAlbum = (event) => {
    event.preventDefault();
    const { inputSearch } = this.state;
    this.setState({ result: inputSearch, inputSearch: '', loading: true }, async () => {
      const arrData = await searchAlbumsAPI(inputSearch);
      const background = document.querySelector('.page-searchs');
      background.style.backgroundBlendMode = 'soft-light';
      background.style.backgroundSize = 'cover';
      this.setState({
        data: [...arrData],
        loading: false,
        isDesabledButton: true,
        video: false,
      });
    });
  }

  render() {
    const { isDesabledButton, inputSearch, loading, result, data, video } = this.state;

    return (
      <div data-testid="page-search" className="page-searchs">
        <Header />
        { loading ? <Loading /> : (
          <section className="main-search">
            <form className="forms" onSubmit={ this.searchAlbum }>
              <input
                type="text"
                data-testid="search-artist-input"
                value={ inputSearch }
                name="inputSearch"
                placeholder="Digite Um Artista/Banda"
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
            </form>
            <div className="container-album-div">
              {data.length === 0 && video ? (
                <div>
                  <div className="video-container">
                    <video src={ videos } autoPlay preload loop className="video">
                      <track kind="captions" />
                    </video>
                    <h2
                      className="experience"
                    >
                      VIVA A EXPERIÊNCIA
                    </h2>
                  </div>
                  <h2 className="life-music">
                    VIVA A MÚSICA
                  </h2>
                </div>
              ) : (
                <section
                  className="album-container"
                >
                  <p className="result-search">
                    {`Resultado de álbuns de: 
              ${result}`}
                  </p>
                  <ul className="albums">
                    {data.map((album) => (
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                        collectionid={ album.collectionId }
                        key={ `${album.collectionName} ${album.collectionId}` }
                        className="link-music"
                      >
                        <li
                          className="album"
                        >
                          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                          <h3>
                            {
                              album.collectionName.split(' ')[1] === undefined ? `${
                                album.collectionName.split(' ')[0]}`
                                : `${
                                  album.collectionName
                                    .split(' ')[0]} ${album.collectionName.split(' ')[1]
                                }`
                            }

                          </h3>
                          <p>{album.artistName}</p>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Search;
