import React from 'react';
import './Chevron.css'; // Optional if you want to keep styles separate

const Chevron = ({ isopen, className = '', ...props }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    role="presentation"
    className={`icon-caret ${className} ${isopen ? '' : 'rotate'}`}
    viewBox="0 0 10 6"
    width="14"
    height="8"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
      fill="currentColor"
    />
  </svg>
);

export default Chevron;

