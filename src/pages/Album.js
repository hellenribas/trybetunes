import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
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

  render() {
    const { data, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {data.length === 0 || loading ? <Loading /> : (
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
                    data={ data }
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
