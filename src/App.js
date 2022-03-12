import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isDesabled: true,
      loadingApi: false,
      redirect: false,
      data: [],
    };
  }

  handleState = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    }, () => {
      const inputLength = 3;
      const { inputName } = this.state;
      const nameUser = inputName.replace(' ', '');
      if (nameUser.length >= inputLength) {
        this.setState({
          isDesabled: false,
        });
      } else {
        this.setState({
          isDesabled: true,
        });
      }
    });
  }

  requestApi = () => {
    const { inputName } = this.state;
    this.setState({ loadingApi: true }, async () => {
      await createUser({ name: inputName });
      this.setState({ loadingApi: false, redirect: true });
    });
  }

  pegaInfo = (datas) => {
    this.setState({ data: datas });
  }

  render() {
    const { isDesabled, inputName, loadingApi, redirect, data } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/search" render={ () => <Search /> } />
          <Route
            exact
            path="/album/:id"
            render={ (props) => <Album { ...props } pegaInfo={ this.pegaInfo } /> }
          />
          <Route
            exact
            path="/favorites"
            render={ () => (
              <Favorites
                { ...this.props }
                pegaInfo={ this.pegaInfo }
              />) }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              isDesabled={ isDesabled }
              handleState={ this.handleState }
              inputName={ inputName }
              requestApi={ this.requestApi }
              loadingApi={ loadingApi }
              data={ data }
            />
            ) }
          >
            {redirect && <Redirect to="/search" /> }
          </Route>
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
