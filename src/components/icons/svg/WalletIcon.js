import PropTypes from 'prop-types';
import React from 'react';
import { Path } from 'react-native-svg';
import Svg from '../Svg';

const WalletIcon = ({ color, colors, ...props }) => {
  return (
    <Svg fill="none" height="32" viewBox="0 0 32 32" width="32" {...props}>
      <Path
        d="M4 6.01791H24C26.2091 6.01791 28 7.80877 28 10.0179V21.9919C28 24.201 26.2091 25.9919 24 25.9919H4V6.01791Z"
        stroke={color || colors.black}
        strokeWidth="2"
      />
      <Path
        d="M28 19L24 19C22.3431 19 21 17.6569 21 16V16C21 14.3431 22.3431 13 24 13L28 13L28 19Z"
        stroke={color || colors.black}
        strokeWidth="2"
      />
    </Svg>
  );
};

WalletIcon.propTypes = {
  color: PropTypes.string,
};

export default WalletIcon;
