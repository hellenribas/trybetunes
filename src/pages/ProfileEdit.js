import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import './css/profileEdit.css';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
      check: true,
      redirect: false,
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  componentWillUnmount() {
    this.getUsers();
  }

  getUsers = () => {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      const { name, email, description, image } = user;
      this.setState({ loading: false, name, email, description, image });
      this.check();
    });
  }

  formChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.check();
    });
  }

  check = () => {
    const { name, email, description, image } = this.state;
    if (name !== ''
    && email !== ''
    && description !== ''
    && image !== '' && email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
      this.setState({ check: false });
    } else {
      this.setState({ check: true });
    }
  }

  update = () => {
    this.setState({ loading: true }, async () => {
      const { name, email, image, description } = this.state;
      await updateUser({ name, email, image, description });
      this.setState({ loading: false });
    });
    this.setState({ redirect: true });
  }

  render() {
    const { loading, description, email, image, name, check, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit" className="profile-edit-container">
        <Header />
        {loading ? <Loading /> : (
          <main className="main-edit-profile">
            <form className="form-edit-profile">
              <label htmlFor="name">
                Nome:
                <input
                  data-testid="edit-input-name"
                  type="text"
                  value={ name }
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={ this.formChange }
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  data-testid="edit-input-email"
                  value={ email }
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={ this.formChange }
                />
              </label>
              <label htmlFor="description">
                Biografia:
                <textarea
                  data-testid="edit-input-description"
                  value={ description }
                  name="description"
                  id="description"
                  placeholder="Sobre Mim"
                  onChange={ this.formChange }
                />
              </label>
              <label htmlFor="image">
                Foto de Perfil:
                <input
                  data-testid="edit-input-image"
                  value={ image }
                  placeholder="Url Imagem"
                  name="image"
                  id="image"
                  onChange={ this.formChange }
                />
              </label>
              <div className="button-save">
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ check }
                  onClick={ this.update }
                >
                  salvar
                </button>
              </div>
            </form>
            <div>
              { redirect && <Redirect to="/profile" /> }
            </div>
          </main>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
