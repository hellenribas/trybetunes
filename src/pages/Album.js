import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import './css/album.css';
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

  componentWillUnmount() {
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
    const { pegaInfo, url } = this.props;

    return (
      <div data-testid="page-album" className="container-musics">
        <Header image={ url } />
        {data.length === 0 || loading ? <Loading /> : (
          <main className="musics-main">
            <section className="background">
              <h2>{data[0].artistName}</h2>
              <img
                src={ data[0].artworkUrl100 }
                alt={ data[0].collectionName }
                className="img-collection"
              />
            </section>
            <section className="musics-container">
              {data.map((album, index) => (
                <section
                  key={ `${album.trackName} ${album.collectionId}` }
                  className={ `music-content music${index}` }
                >
                  { album.trackName !== undefined && (
                    <MusicCard
                      trackName={ album.trackName }
                      previewUrl={ album.previewUrl }
                      trackId={ album.trackId }
                      data={ data }
                      pegaInfo={ pegaInfo }
                      removeSongs={ () => '' }
                    />
                  )}
                </section>))}
            </section>
          </main>
        )}
      </div>
    );
  }
}

Album.propTypes = ({
  collectionId: propTypes.string,
}).isRequired;

export default Album;
