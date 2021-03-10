import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components';
import AssetsHeader from '../components/assets-header';
import AssetsItemHeader from '../components/assets-list-item/AssetsItemHeader';
import { Button } from '../components/buttons';
import ImgixImage from '../components/images/ImgixImage';
import { Flex, Page } from '../components/layout';
import { H1, Text } from '../components/text';
import { useTheme } from '../context/ThemeContext';

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

const ImageContainer = styled(ImgixImage)`
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 550px;
  margin-top: 8px;
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
          <ImageContainer
            source={{
              uri: asset.image_url,
            }}
          />
          <ContentContainer>
            <H1>{asset.description}</H1>
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
            Buy now for ${asset.usd_price}
          </ButtonText>
        </ButtonContainer>
        <FreeContainer>
          <FreeText>
            Service fee 2.5% {asset.eth_price} ETH ${asset.usd_price}
          </FreeText>
        </FreeContainer>
      </AssetFooter>
    </>
  );
}
