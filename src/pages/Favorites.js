import propTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      songsData: [],
      loadingCheck: false,
    };
    this.removeSongs = this.removeSongs.bind(this);
  }

  componentDidMount() {
    this.getFavoriteSongs();
  }

  componentDidUpdate() {
    this.removeSongs();
  }

  componentWillUnmount() {
    this.getFavoriteSongs();
  }

  getFavoriteSongs = () => {
    const { pegaInfo } = this.props;
    this.setState({ loadingCheck: true }, async () => {
      const songData = await getFavoriteSongs();
      this.setState({ songsData: songData, loadingCheck: false });
      const { songsData } = this.state;
      pegaInfo(songsData);
    });
  }

  removeSongs(obj) {
    const objSong = obj;
    if (objSong !== undefined) {
      const { data, previewUrl, trackId, trackName } = objSong;
      this.setState({ loadingCheck: true }, async () => {
        await removeSong({ data, previewUrl, trackId, trackName });
        this.setState({ loadingCheck: false });
        this.getFavoriteSongs();
      });
    }
  }

  render() {
    const { pegaInfo } = this.props;
    const { loadingCheck, songsData } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loadingCheck ? <Loading /> : (
          songsData.map((album) => (
            <MusicCard
              pegaInfo={ pegaInfo }
              trackName={ album.trackName }
              removeSongs={ this.removeSongs }
              previewUrl={ album.previewUrl }
              trackId={ album.trackId }
              data={ songsData }
              key={ album.trackId }
            />)))}
      </div>
    );
  }
}

Favorites.propTypes = {
  pegaInfo: propTypes.func.isRequired,
};

export default Favorites;
