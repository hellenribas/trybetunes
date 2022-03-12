import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
        <Header />
        {loadingApi ? <Loading /> : (
          <section>
            <h2>Nome</h2>
            <p>{name}</p>
            <h2>Email</h2>
            <p>{email}</p>
            <h2>Descrição</h2>
            <p>{description}</p>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <Link to="/profile/edit">Editar perfil</Link>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
