import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, blue, inverted, ...otherProps }) => (
  <button
    className={`${inverted ? 'inverted' : ''} custom-button ${
      blue ? 'verify-button' : ''
    }`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
