import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, blue, ...otherProps }) => (
  <button
    className={`custom-button ${blue ? 'verify-button' : ''}`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
