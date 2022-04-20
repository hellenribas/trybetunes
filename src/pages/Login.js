import React, { Component } from 'react';
import propTypes from 'prop-types';
import Loading from '../components/Loading';
import './css/login.css';

class Login extends Component {
  render() {
    const { isDesabled, inputName, handleState, requestApi, loadingApi } = this.props;
    return (
      <div data-testid="page-login" className="container-login">
        {!loadingApi ? (
          <form className="forms-login">
            <div className="user-info">
              <h2>LOGIN</h2>
              <input
                type="text"
                data-testid="login-name-input"
                value={ inputName }
                name="inputName"
                onChange={ handleState }
                placeholder="nome de usuário"
              />
              <button
                disabled={ isDesabled }
                type="submit"
                data-testid="login-submit-button"
                onClick={ requestApi }
              >
                Entrar
              </button>
            </div>
          </form>) : <Loading />}
      </div>
    );
  }
}

Login.propTypes = ({
  isDesabled: propTypes.bool,
}).isRequired;

export default Login;
