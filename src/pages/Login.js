import React, { Component } from 'react';
import propTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends Component {
  render() {
    const { isDesabled, inputName, handleState, requestApi, loadingApi } = this.props;
    return (
      <div data-testid="page-login">
        {!loadingApi ? (
          <form>
            <input
              type="text"
              data-testid="login-name-input"
              value={ inputName }
              name="inputName"
              onChange={ handleState }
            />
            <button
              disabled={ isDesabled }
              type="submit"
              data-testid="login-submit-button"
              onClick={ requestApi }
            >
              Entrar
            </button>
          </form>) : <Loading />}
      </div>
    );
  }
}

Login.propTypes = ({
  isDesabled: propTypes.bool,
}).isRequired;

export default Login;
