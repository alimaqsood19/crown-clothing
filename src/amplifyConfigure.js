import Amplify from '@aws-amplify/core';

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'ca-central-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ca-central-1_oxyLwq3cq',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '5vqq2hdjb19thefph6ct0lhv5n',
  },
});

export default Amplify;
