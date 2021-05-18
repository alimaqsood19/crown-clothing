import './App.css';
import './amplifyConfigure';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shoppage.component';
import Header from './components/header/header.component';
import LoginPage from './pages/loginpage/loginpage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import React, { useEffect, useState } from 'react';
import { getUser } from './helpers/authHelper';
import { Hub } from '@aws-amplify/core';
import { connect } from 'react-redux';
import { setCurrentUserStart } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

const App = ({ setCurrentUserStart, currentUser }) => {
  useEffect(() => {
    setCurrentUserStart();
  }, []);

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          path='/signin'
          render={() => (currentUser ? <Redirect to='/' /> : <LoginPage />)}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserStart: () => dispatch(setCurrentUserStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
