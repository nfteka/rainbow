import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../buttons';
import { Flex } from '../layout';
import { H1, Text } from '../text';
import { buyOrder, handleSeaportEvents } from '@rainbow-me/redux/assets';

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

function AssetsItemFooter({ asset }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const onBuyPress = () => {
    dispatch(handleSeaportEvents());
    dispatch(
      buyOrder({
        address: asset.asset_contract.address,
        tokenId: asset.tokenId,
      })
    );
  };
  return (
    <BetweenContainer>
      <TextContainer>
        <CryptCount>{asset.ethPrice}ETH</CryptCount>
        <Count>${asset.usdPrice}</Count>
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

export default memo(AssetsItemFooter);
