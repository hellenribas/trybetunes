import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ImUser } from 'react-icons/im';
import propTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import '../pages/css/header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
    };
  }

  componentDidMount() {
    this.getUserApi();
  }

  componentWillUnmount() {
    this.getUserApi();
  }

  getUserApi = () => {
    this.setState({ loading: true }, async () => {
      const { name } = await getUser();
      this.setState({
        user: name,
        loading: false,
      });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component" className="header">
        <div className="links">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="link"
          >
            Search
          </Link>
          <Link
            to="/favorites"
            className="link"
            data-testid="link-to-favorites"
          >
            Favorites

          </Link>
          <Link
            to="/profile"
            className="link"
            data-testid="link-to-profile"
          >
            Profile

          </Link>
        </div>
        { loading
          ? <p>Carregando...</p>
          : (
            <div className="user-container">
              <ImUser className="user-icon" />
              <p data-testid="header-user-name" className="user">
                {
                  user
                }

              </p>
            </div>)}
      </header>
    );
  }
}

Header.propTypes = {
  image: propTypes.string,
}.isRequired;

export default Header;
