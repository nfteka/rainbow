import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AssetsHeader from '../components/assets-header';
import AssetsListItem from '../components/assets-list-item';
import EmptyAssetsList from '../components/assets-list-item/EmptyAssetsList';
import { Page } from '../components/layout';
import { useTheme } from '../context/ThemeContext';
import {
  useHideSplashScreen,
  useInitializeWallet,
  usePrevious,
} from '@rainbow-me/hooks';
import {
  getAssetsList,
  handleSeaportEvents,
  reloadAssetsList,
} from '@rainbow-me/redux/assets';

const Container = styled(Page)`
  background-color: ${props => props.color};
`;

const ListContainer = styled(FlatList)`
  background-color: ${props => props.color};
`;

export default function AssetsList() {
  const { assets, assetsLoading } = useSelector(state => state.assets);
  const { network } = useSelector(state => state.settings);
  const [refresh, onRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const hideSplashScreen = useHideSplashScreen();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const preLoadingAssets = usePrevious(assetsLoading);

  const initializeWallet = useInitializeWallet();

  useEffect(() => {
    setLoading(true);
    dispatch(getAssetsList());
  }, [dispatch, network]);

  useEffect(() => {
    dispatch(handleSeaportEvents());
    hideSplashScreen();
    initializeWallet(null, null, null, true);
  }, []);

  useEffect(() => {
    if (preLoadingAssets && !assetsLoading) {
      setLoading(false);
    }
  }, [preLoadingAssets, assetsLoading]);

  const refreshData = () => {
    dispatch(
      reloadAssetsList(() => {
        onRefresh(false);
      })
    );
  };

  const renderItem = ({ item }) => <AssetsListItem asset={item} />;

  return (
    <Container color={colors.white}>
      <StatusBar barStyle="dark-content" />
      <AssetsHeader />
      {loading ? (
        <EmptyAssetsList animated={loading} />
      ) : (
        <ListContainer
          color={colors.blueGreyDarkLight}
          data={assets}
          keyExtractor={item => item.asset_contract.address}
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
      )}
    </Container>
  );
}
