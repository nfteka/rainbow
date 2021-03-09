import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { FlexItem } from '../components/layout';
import { TestnetToast } from '../components/toasts';
import AssetsItem from '../screens/AssetsItem';
import AssetsList from '../screens/AssetsList';
import OwnerProfile from '../screens/OwnerProfile';
import { useAccountSettings } from '@rainbow-me/hooks';
import Routes from '@rainbow-me/routes';

const Stack = createStackNavigator();

export function AssetsRoutes() {
  const { network } = useAccountSettings();
  return (
    <FlexItem>
      <Stack.Navigator
        headerMode="none"
        initialRouteName={Routes.ASSETS_LIST}
        keyboardHandlingEnabled="ios"
      >
        <Stack.Screen component={AssetsList} name={Routes.ASSETS_LIST} />
        <Stack.Screen component={AssetsItem} name={Routes.ASSETS_ITEM} />
        <Stack.Screen component={OwnerProfile} name={Routes.OWNER_PROFILE} />
      </Stack.Navigator>
      <TestnetToast network={network} />
    </FlexItem>
  );
}
