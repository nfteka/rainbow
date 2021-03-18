import { captureException } from '@sentry/react-native';
import React from 'react';
import { Image, ScrollView, StatusBar } from 'react-native';
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
  const onBuyPress = () => {
    console.log('BUY PRESS');
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
