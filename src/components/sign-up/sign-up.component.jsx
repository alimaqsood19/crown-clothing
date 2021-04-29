import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import axios from 'axios';
import { Auth } from '@aws-amplify/auth';
import './sign-up.styles.scss';
import { withRouter } from 'react-router-dom';

async function signUp(username, password) {
  try {
    const { userConfirmed } = await Auth.signUp({
      username,
      password,
    });
    return userConfirmed;
  } catch (error) {
    console.log('error signing up:', error);
  }
}

async function confirmSignUp(username, code) {
  try {
    const data = await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

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
      confirmationRequired: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signUp(this.state.email, this.state.password);
    } catch (err) {
      console.error(err);
    }

    this.setState({ password: '', confirmationRequired: true });
  };

  handleVerify = async (event) => {
    event.preventDefault();
    await confirmSignUp(this.state.email, this.state.code);
    await axios.post('/api/users', { email: this.state.email });
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
    const { email, password, code } = this.state;
    if (this.state.confirmationRequired) {
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

export default withRouter(SignUp);
