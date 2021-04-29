import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { Auth } from '@aws-amplify/auth';
import './sign-in.styles.scss';
import { withRouter } from 'react-router-dom';

async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
    console.log(user);
  } catch (error) {
    console.log('error signing in', error);
  }
}

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await signIn(this.state.email, this.state.password);
    this.props.history.push('/');
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <CustomButton type='submit'> Sign in </CustomButton>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);
