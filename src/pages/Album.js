import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      loadingCheck: false,
    };
  }

  componentDidMount() {
    this.getMusicApi();
  }

  getMusicApi = () => {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ loading: true }, async () => {
      const request = await getMusics(id);
      this.setState({ data: [...request], loading: false });
    });
  }

  favoriteSong = ({ target }) => {
    const { data } = this.state;
    const dataSong = data.find((song) => Number(song.trackId) === Number(target.id));
    this.setState({
      loadingCheck: true,
      [target.name.replaceAll(' ', '')]: true,
    }, async () => {
      if (target.checked) {
        await addSong(dataSong);
        this.setState({ loadingCheck: false });
      }
    });
  }

  render() {
    const { data, loading, loadingCheck } = this.state;
    const { state } = this;
    console.log(this.props);
    return (
      <div data-testid="page-album">
        <Header />
        {data.length === 0 || loading || loadingCheck ? <Loading /> : (
          <section>
            <p data-testid="artist-name">{data[0].artistName}</p>
            <p data-testid="album-name">{data[0].collectionName}</p>
            {data.map((album) => (
              <section
                key={ `${album.trackName} ${album.collectionId}` }
              >
                { album.trackName !== undefined && (
                  <MusicCard
                    trackName={ album.trackName }
                    previewUrl={ album.previewUrl }
                    trackId={ album.trackId }
                    data={ album }
                    name={ album.trackName.replaceAll(' ', '') }
                    favoriteSong={ this.favoriteSong }
                    checkFav={ state[album.trackName.replaceAll(' ', '')] }
                  />
                )}
              </section>))}
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = ({
  collectionId: propTypes.string,
}).isRequired;

export default Album;
