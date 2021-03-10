import React, { useCallback } from 'react';
import { Share } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { ButtonPressAnimation } from '../animations';
import { Icon } from '../icons';

const SharedButtonContainer = styled(ButtonPressAnimation)`
  width: 32px;
  height: 32px;
  right: 0;
  top: 0;
  justify-content: center;
  align-items: center;

  background-color: ${props => props.color};
  border-radius: 16px;
`;

export default function SharedButton({ message }) {
  const { colors } = useTheme();
  const onSharedPress = useCallback(() => {
    Share.share({
      message,
      title: 'Asset item:',
    });
  }, []);
  return (
    <SharedButtonContainer color={colors.clearGrey} onPress={onSharedPress}>
      <Icon color={colors.black} name="threeDots" />
    </SharedButtonContainer>
  );
}
