import axios from 'axios';
import { Auth } from '@aws-amplify/auth';

const getCartInformation = ({
  attributes: { email },
  signInUserSession: {
    accessToken: { jwtToken },
  },
}) => {
  return axios
    .get(`/api/users/${email}`, {
      headers: { Authorization: `token ${jwtToken}` },
    })
    .then(({ data: cart }) => {
      return {
        cart,
        email,
      };
    })
    .catch((err) => console.log(err));
};

export const getUser = () => {
  return Auth.currentAuthenticatedUser()
    .then((userData) => {
      return getCartInformation(userData);
    })
    .catch(() => console.log('Not signed in'));
};
