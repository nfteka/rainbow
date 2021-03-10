import React, { useState } from 'react';
import { FlatList, RefreshControl, StatusBar } from 'react-native';
import styled from 'styled-components';
import AssetsHeader from '../components/assets-header';
import { AssetsListItem } from '../components/assets-list-item';
import { Page } from '../components/layout';
import { useTheme } from '../context/ThemeContext';
import { mockAssets } from '../mock';
import { useHideSplashScreen } from '@rainbow-me/hooks';

const Container = styled(Page)`
  background-color: ${props => props.color};
`;

const ListContainer = styled(FlatList)`
  background-color: ${props => props.color};
`;

export default function AssetsList() {
  useHideSplashScreen()();
  const [refresh, onRefresh] = useState(false);
  const { colors } = useTheme();
  const refreshData = () => {
    setTimeout(() => onRefresh(false), 500);
  };
  const renderItem = ({ item }) => <AssetsListItem asset={item} />;
  return (
    <Container color={colors.white}>
      <StatusBar barStyle="dark-content" />
      <AssetsHeader />
      <ListContainer
        color={colors.blueGreyDarkLight}
        data={mockAssets}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              onRefresh(true);
              refreshData();
            }}
            refreshing={refresh}
          />
        }
        renderItem={renderItem}
      />
    </Container>
  );
}
