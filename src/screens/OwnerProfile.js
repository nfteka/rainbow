import React from 'react';
import { StatusBar } from 'react-native';
import AssetsHeader from '../components/assets-header';
import { Page } from '../components/layout';

export default function OwnerProfile(props) {
  return (
    <Page>
      <StatusBar barStyle="dark-content" />
      <AssetsHeader />
    </Page>
  );
}
