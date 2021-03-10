import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../header';
import { Icon } from '../icons';
import CircleHeaderButton from './CircleHeaderButton';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';

const HeaderContainer = styled(Header)`
  padding-bottom: 15px;
`;

export default function AssetsHeader() {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const onPressWallet = useCallback(
    () => navigate(Routes.MAIN_STACK_NAVIGATOR),
    [navigate]
  );

  const onPressSettings = useCallback(() => navigate(Routes.SETTINGS_MODAL), [
    navigate,
  ]);
  return (
    <HeaderContainer align="center" justify="space-between">
      <CircleHeaderButton
        color={colors.white}
        onPress={onPressSettings}
        opacityTouchable={false}
        radiusAndroid={42}
        radiusWrapperStyle={{
          alignItems: 'center',
          height: 42,
          justifyContent: 'center',
          marginLeft: 5,
          width: 42,
        }}
        testID="settings-button"
      >
        <Icon color={colors.black} name="gear" />
      </CircleHeaderButton>
      <CircleHeaderButton
        color={colors.white}
        onPress={onPressWallet}
        opacityTouchable={false}
        radiusAndroid={42}
        radiusWrapperStyle={{
          alignItems: 'center',
          height: 42,
          justifyContent: 'center',
          marginLeft: 5,
          width: 42,
        }}
        testID="settings-button"
      >
        <Icon color={colors.black} name="walletIcon" />
      </CircleHeaderButton>
    </HeaderContainer>
  );
}
