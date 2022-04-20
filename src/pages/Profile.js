import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './css/profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: [],
      loadingApi: false,
    };
  }

  componentDidMount() {
    this.userApi();
  }

  componentWillUnmount() {
    this.userApi();
  }

  userApi = () => {
    this.setState({ loadingApi: true }, async () => {
      const user = await getUser();
      this.setState({ loadingApi: false, userInfo: user });
    });
  }

  render() {
    const { loadingApi, userInfo: { description, email, image, name } } = this.state;

    return (
      <div data-testid="page-profile">
        <Header image={ image } />
        {loadingApi ? <Loading /> : (
          <main className="perfil">
            <section className="perfil-data">
              {image
                ? (
                  <img
                    data-testid="profile-image"
                    src={ image }
                    alt={ name }
                    className="image-person-user"
                  />)
                : <FaUserCircle className="user-img-profile" />}
              <h2>Nome</h2>
              <p>{name}</p>
              <h2>Email</h2>
              <p>{email}</p>
              <h2>Descrição</h2>
              <p>{description}</p>
              <Link to="/profile/edit" className="edit-prof">Editar perfil</Link>
            </section>
          </main>
        )}
      </div>
    );
  }
}

export default Profile;
