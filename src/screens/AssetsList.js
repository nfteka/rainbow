import React from 'react';
import { StatusBar } from 'react-native';
import AssetsHeader from '../components/assets-header';
import { useTheme } from '../context/ThemeContext';
import { WalletPage } from './WalletScreen';
import { useHideSplashScreen } from '@rainbow-me/hooks';

export default function AssetsList() {
  const { colors } = useTheme();
  useHideSplashScreen()();
  return (
    <WalletPage>
      <StatusBar barStyle="dark-content" />
      <AssetsHeader />
    </WalletPage>
  );
}
