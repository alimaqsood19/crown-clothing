import axios from 'axios';
import { Auth } from '@aws-amplify/auth';

export const getCartInformation = ({
  attributes: { email },
  signInUserSession: {
    accessToken: { jwtToken },
  },
}) => {
  return axios
    .get(`/api/users/${email}`, {
      headers: { Authorization: `token ${jwtToken}` },
    })
    .then(({ data }) => {
      const { carts, email, id } = data[0];
      return {
        cart: carts,
        user: { email, id },
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
