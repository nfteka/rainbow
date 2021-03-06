import React from 'react';
import { StatusBar } from 'react-native';
import AssetsHeader from '../components/assets-header';
import { WalletPage } from './WalletScreen';

export default function AssetsItem() {
  return (
    <WalletPage>
      <StatusBar barStyle="dark-content" />
      <AssetsHeader />
    </WalletPage>
  );
}
