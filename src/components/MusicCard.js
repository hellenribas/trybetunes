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

  favoriteSong = async (target) => {
    const { data, previewUrl, trackId, trackName } = this.props;
    this.setState({ loadingCheck: true });
    await addSong({ data, previewUrl, trackId, trackName });
    this.setState({ loadingCheck: false, checkFav: target.checked });
  }

  getFavoriteSong = async () => {
    const { trackName, pegaInfo } = this.props;
    const songData = await getFavoriteSongs();
    this.setState({ songsData: [...songData], loadingCheck: false }, () => {
      const { songsData } = this.state;
      pegaInfo(songsData);
      songData.map((song) => {
        if (song.trackName.includes(trackName)) {
          this.setState({ checkFav: true });
          return songsData;
        }
        return true;
      });
    });
  }

  checkSong = ({ target }) => {
    const { checkFav } = this.state;
    this.setState({ checkFav: target.checked }, () => {
      if (!checkFav) {
        this.favoriteSong(target);
      } else {
        this.removeSong(target);
      }
    });
  }

    removeSong = (target) => {
      const { data, previewUrl, trackId, trackName, removeSongs } = this.props;
      const propSong = this.props;
      this.setState({ loadingCheck: true, checkFav: target.checked }, async () => {
        await removeSong({ data, previewUrl, trackId, trackName });
        this.setState({ loadingCheck: false });
        removeSongs(propSong);
      });
    }

    render() {
      const { trackName, previewUrl, trackId, songData } = this.props;
      const { checkFav, loadingCheck } = this.state;
      return (
        <div>
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
                    name="checkFav"
                    onChange={ this.checkSong }
                    checked={ checkFav }
                  />
                </label>
              </section>)}
          </section>
          { songData !== undefined && (
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
                      name="checkFav"
                      onChange={ this.checkSong }
                      checked={ checkFav }
                    />
                  </label>
                </section>)}
            </section>
          )}
        </div>
      );
    }
}

MusicCard.propTypes = ({
  trackName: propTypes.string,
}).isRequired;

export default MusicCard;
