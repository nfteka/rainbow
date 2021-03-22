import { captureException } from '@sentry/react-native';
import { get } from 'lodash';
import React, { useEffect } from 'react';
import { Image, InteractionManager, ScrollView, StatusBar } from 'react-native';
import { SMART_CONTRACT } from 'react-native-dotenv';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import AssetsHeader from '../components/assets-header';
import AssetsItemHeader from '../components/assets-list-item/AssetsItemHeader';
import { Button } from '../components/buttons';
import { Flex, Page } from '../components/layout';
import { H1, Text } from '../components/text';
import { useTheme } from '../context/ThemeContext';
import { sendTransaction } from '../model/wallet';
import {
  createBuyTransaction,
  estimateGasLimit,
} from '@rainbow-me/handlers/web3';
import { useAccountSettings, useGas } from '@rainbow-me/hooks';
import logger from 'logger';

const Container = styled(Page)`
  background-color: ${props => props.color};
`;

const ScrollContainer = styled(ScrollView).attrs({
  contentContainerStyle: { paddingBottom: 400 },
})`
  background-color: ${props => props.color};
`;

const ContentContainer = styled.View`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 20px;
`;

const ImageContainer = styled.View`
  min-height: 50px;
  max-height: 550px;
  margin-top: 8px;
`;

const AssetImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const AssetFooter = styled.View`
  width: 100%;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0px;
  padding-top: 15px;
  padding-bottom: 25px;
  background-color: ${props => props.color};
`;

const ButtonContainer = styled(Button)`
  align-items: center;
  justify-content: center;
  padding-left: 50px;
  padding-right: 50px;
`;

const ButtonText = styled(Text)`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: ${props => props.color};
`;

const FreeContainer = styled(Flex)`
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const FreeText = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;

export default function AssetsItem(props) {
  const { asset } = props.route.params;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { accountAddress } = useAccountSettings();
  const {
    gasLimit,
    selectedGasPrice,
    startPollingGasPrices,
    stopPollingGasPrices,
  } = useGas();

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => startPollingGasPrices());
    return () => {
      InteractionManager.runAfterInteractions(() => stopPollingGasPrices());
    };
  }, [startPollingGasPrices, stopPollingGasPrices]);

  const onBuyPress = async () => {
    // dispatch(handleSeaportEvents());
    // dispatch(
    //   buyOrder({ address: asset.assetContract.address, tokenId: asset.tokenId })
    // );

    try {
      const updatedGasLimit = await estimateGasLimit({
        address: SMART_CONTRACT,
        amount: asset.ethPrice,
        asset,
        recipient: accountAddress,
      });

      console.log('updatedGasLimit => ', updatedGasLimit);

      const txDetails = {
        amount: asset.ethPrice,
        asset,
        from: accountAddress,
        gasLimit: 10000000, // updatedGasLimit,
        gasPrice: get(selectedGasPrice, 'value.amount'),
        to: SMART_CONTRACT,
      };

      console.log(txDetails.asset.sell_orders[0]);

      try {
        const signableTransaction = await createBuyTransaction(txDetails);
        const txResult = await sendTransaction({
          transaction: signableTransaction,
        });

        console.log('txResult => ', txResult);
      } catch (error) {
        logger.sentry('onSubmit error', error);
        captureException(error);
      }
    } catch (e) {
      logger.sentry('onSubmit error', e);
    }
  };
  return (
    <>
      <Container color={colors.white}>
        <StatusBar barStyle="dark-content" />
        <AssetsHeader />
        <ScrollContainer color={colors.blueGreyDarkLight}>
          <ContentContainer>
            <AssetsItemHeader owner={asset.owner} />
          </ContentContainer>
          <ImageContainer>
            <AssetImage
              resizeMode="contain"
              source={{
                uri: asset.image_url,
              }}
            />
          </ImageContainer>

          <ContentContainer>
            <H1>{asset.title}</H1>
          </ContentContainer>
        </ScrollContainer>
      </Container>
      <AssetFooter color={colors.white}>
        <ButtonContainer
          backgroundColor={colors.black}
          containerStyles={{
            paddingTop: '13px',
            paddingBottom: '15px',
          }}
          onPress={onBuyPress}
        >
          <ButtonText color={colors.white}>
            Buy now for ${asset.usdPrice}
          </ButtonText>
        </ButtonContainer>
        <FreeContainer>
          <FreeText>
            Service fee 2.5% {asset.ethPrice} ETH ${asset.usdPrice}
          </FreeText>
        </FreeContainer>
      </AssetFooter>
    </>
  );
}
