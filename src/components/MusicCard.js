import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loadingCheck: false,
      checkFav: false,
      songsData: [],
    };
  }

  componentDidMount() {
    this.getFavoriteSong();
  }

  favoriteSong = (target) => {
    const { data, previewUrl, trackId, trackName } = this.props;
    this.setState({ loadingCheck: true, checkFav: target.checked }, async () => {
      await addSong({ data, previewUrl, trackId, trackName });
      this.setState({ loadingCheck: false });
    });
  }

  getFavoriteSong = () => {
    console.log(this.props);
    const { trackName } = this.props;
    this.setState({ loadingCheck: true }, async () => {
      const songData = await getFavoriteSongs();
      this.setState({ songsData: [...songData], loadingCheck: false }, () => {
        const { songsData } = this.state;
        songData.map((song) => {
          if (song.trackName.includes(trackName)) {
            this.setState({ checkFav: true });
            return songsData;
          }
          return true;
        });
      });
    });
  }

  removeSong = (target) => {
    console.log('chegou');
    const { data, previewUrl, trackId, trackName } = this.props;
    this.setState({ loadingCheck: true, checkFav: target.checked }, async () => {
      await removeSong({ data, previewUrl, trackId, trackName });
      this.setState({ loadingCheck: false });
    });
  }

  checkSong = ({ target }) => {
    const { songsData } = this.state;
    songsData.map((song) => {
      if (Number(song.trackId) === Number(target.id)) {
        console.log('entrou');
        this.removeSong(target);
      } else {
        console.log('entrou2');
        this.favoriteSong(target);
      }
      return true;
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checkFav, loadingCheck } = this.state;
    return (
      <section>
        { loadingCheck ? <Loading /> : (
          <section>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento;
              <code>audio</code>
            </audio>
            <label
              htmlFor={ trackId }
            >
              Favorita
              <input
                type="checkbox"
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.checkSong }
                checked={ checkFav }
              />
            </label>
          </section>)}
      </section>
    );
  }
}

MusicCard.propTypes = ({
  trackName: propTypes.string,
}).isRequired;

export default MusicCard;
