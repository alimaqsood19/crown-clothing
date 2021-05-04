import './App.css';
import './amplifyConfigure';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shoppage.component';
import Header from './components/header/header.component';
import LoginPage from './pages/loginpage/loginpage.component';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser } from './helpers/authHelper';
import { Hub } from '@aws-amplify/core';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

const App = ({ setCurrentUser }) => {
  //TODO: REMOVE state
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log(event);
      switch (event) {
        case 'signIn':
          getUser().then((user) => {
            if (user) {
              setUser(user.email);
              setCurrentUser(user.email);
              setCart(user.cart);
            }
          });
          break;
        case 'signOut':
          setUser(null);
          setCurrentUser(null);
          break;
        case 'signIn_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then((user) => {
      if (user) {
        setUser(user.email);
        setCurrentUser(user.email);
        setCart(user.cart);
      }
    });
  }, []);

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={LoginPage} />
      </Switch>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
