import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import axios from 'axios';
import { Auth } from '@aws-amplify/auth';
import './sign-up.styles.scss';
import { withRouter } from 'react-router-dom';
import { signUpStart, confirmationStart } from '../../redux/user/user.actions';
import { selectConfirmationRequired } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

//TODO: Move to SAGAS
async function resendConfirmationCode(username) {
  try {
    await Auth.resendSignUp(username);
    console.log('code resent successfully');
  } catch (err) {
    console.log('error resending code: ', err);
  }
}

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      code: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signUpStart(this.state.email, this.state.password);
    this.setState({ password: '' });
  };

  handleVerify = (event) => {
    event.preventDefault();
    this.props.confirmationStart(this.state.email, this.state.code);
    this.props.history.push('/');
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleResendVerificationCode = async () => {
    await resendConfirmationCode(this.state.email);
  };

  render() {
    const { confirmationRequired } = this.props;
    const { email, password, code } = this.state;
    if (confirmationRequired) {
      return (
        <div className='sign-up'>
          <h2>Verify your account</h2>

          <form onSubmit={this.handleVerify}>
            <FormInput
              name='email'
              type='email'
              handleChange={this.handleChange}
              value={email}
              label='email'
              required
            />
            <FormInput
              name='code'
              type='text'
              value={code}
              handleChange={this.handleChange}
              label='code'
              required
            />
            <div className='button-group'>
              <CustomButton type='submit' blue>
                Verify
              </CustomButton>
              <span>Didn't receive a code? Click to resend.</span>
              <CustomButton
                type='submit'
                onClick={this.handleResendVerificationCode}
              >
                Resend
              </CustomButton>
            </div>
          </form>
        </div>
      );
    }
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />

          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  confirmationRequired: selectConfirmationRequired,
});

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (email, password) => dispatch(signUpStart(email, password)),
  confirmationStart: (email, code) => dispatch(confirmationStart(email, code)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
