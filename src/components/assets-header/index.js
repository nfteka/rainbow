import React, { useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Header, HeaderButton } from '../header';
import { Icon } from '../icons';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';

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
    <Header align="center" justify="space-between">
      <HeaderButton
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
      </HeaderButton>
      <HeaderButton
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
      </HeaderButton>
    </Header>
  );
}
