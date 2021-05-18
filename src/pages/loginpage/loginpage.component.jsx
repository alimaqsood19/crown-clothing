import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsUserFetching } from '../../redux/user/user.selectors';
import './loginpage.styles.scss';

const SignInWithSpinner = WithSpinner(SignIn);
const SignUpWithSpinner = WithSpinner(SignUp);

const LoginPage = ({ isFetchingUser }) => (
  <div className='sign-in-and-sign-up'>
    <SignInWithSpinner isLoading={isFetchingUser} />
    <SignUpWithSpinner />
  </div>
);

const mapStateToProps = createStructuredSelector({
  isFetchingUser: selectIsUserFetching,
});

export default connect(mapStateToProps)(LoginPage);
