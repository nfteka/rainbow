import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../buttons';
import { Flex } from '../layout';
import { H1, Text } from '../text';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';

const TextContainer = styled(Flex)`
  margin-top: 8px;
  justify-content: space-around;
  align-items: flex-end;
  flex-direction: row;
`;

const CryptCount = styled(H1)`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
`;

const Count = styled(H1)`
  margin-left: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
`;

const BetweenContainer = styled(Flex)`
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonText = styled(Text)`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: ${props => props.color};
`;

export default function AssetsItemFooter({ asset }) {
  const { colors } = useTheme();
  const onBuyPress = () => {
    console.log('BUY BUTTON PRESS');
  };
  return (
    <BetweenContainer>
      <TextContainer>
        <CryptCount>{asset.eth_price} ETH</CryptCount>
        <Count>${asset.usd_price}</Count>
      </TextContainer>
      <Button
        backgroundColor={colors.black}
        containerStyles={{
          paddingTop: '7px',
          paddingBottom: '9px',
          paddingHorizontal: '17px',
        }}
        onPress={onBuyPress}
      >
        <ButtonText color={colors.white}>Buy now</ButtonText>
      </Button>
    </BetweenContainer>
  );
}
