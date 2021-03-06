import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { FlexItem } from '../components/layout';
import { TestnetToast } from '../components/toasts';
import AssetsItem from '../screens/AssetsItem';
import AssetsList from '../screens/AssetsList';
import { stackNavigationConfig } from './config';
import { useAccountSettings } from '@rainbow-me/hooks';
import Routes from '@rainbow-me/routes';

const Stack = createSharedElementStackNavigator();

export function AssetsRoutes() {
  const { network } = useAccountSettings();
  return (
    <FlexItem>
      <Stack.Navigator
        {...stackNavigationConfig}
        initialRouteName={Routes.ASSETS_LIST}
        screenOptions={{
          cardStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen component={AssetsList} name={Routes.ASSETS_LIST} />
        <Stack.Screen
          component={AssetsItem}
          name={Routes.ASSETS_ITEM}
          sharedElements={route => {
            const { id } = route.params.assets;
            return [id];
          }}
        />
      </Stack.Navigator>
      <TestnetToast network={network} />
    </FlexItem>
  );
}
