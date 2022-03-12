import React, { Component } from 'react';
import Header from '../components/Header';
// import { getUser } from '../services/userAPI';

class Profile extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     userInfo: [],
  //     loading: false,
  //   };
  // }

  // componentDidMount() {
  //   this.userApi();
  // }

  // userApi = () => {
  //   this.setState({ loadingApi: true }), async () => {
  //     const user = await getUser();
  //     console.log(user);
  //     this.setState({ loadingApi: false, userInfo: user });
  // }
  // }

  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <p>EStou no Profile</p>
      </div>
    );
  }
}

export default Profile;
