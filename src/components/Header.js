import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        { loading
          ? <p>Carregando...</p>
          : <p data-testid="header-user-name">{ user }</p>}
        <Link
          to="/search"
          data-testid="link-to-search"
        >
          Search
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
