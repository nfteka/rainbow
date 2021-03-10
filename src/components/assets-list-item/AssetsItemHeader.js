import React, { useCallback } from 'react';
import { Share, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { ButtonPressAnimation } from '../animations';
import { Icon } from '../icons';
import ImgixImage from '../images/ImgixImage';
import { Flex } from '../layout';
import { Bold, Text } from '../text';
import SharedButton from './SharedButton';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';

const BetweenContainer = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileButton = styled(ButtonPressAnimation)`
  width: 32px;
  height: 32px;
  right: 0;
  top: 0;
  justify-content: center;
  align-items: center;

  background-color: ${props => props.color};
  border-radius: 16px;
`;

const ImageContainer = styled(ImgixImage)`
  width: 100%;
  height: 100%;
  margin-top: 8px;
  border-radius: 16px;
`;

const OwnerContainer = styled(Flex)`
  justify-content: space-around;
`;

const OwnerLabel = styled(Text)`
  font-size: 11px;
`;

const OwnerBlock = styled(Flex)`
  margin-left: 10px;
  margin-top: 5px;
  flex-direction: column;
  justify-content: space-around;
`;

export default function AssetsItemHeader({ owner }) {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const ownerPress = useCallback(
    () => navigate(Routes.OWNER_PROFILE, { owner }),
    [navigate]
  );

  return (
    <BetweenContainer>
      <OwnerContainer>
        <ProfileButton color={colors.clearGrey} onPress={ownerPress}>
          <ImageContainer
            source={{
              uri: owner.profile_img_url,
            }}
          />
        </ProfileButton>
        <TouchableOpacity activeOpacity={0.8} onPress={ownerPress}>
          <OwnerBlock>
            <OwnerLabel>Owner</OwnerLabel>
            <Bold>@{owner.username.toLowerCase()}</Bold>
          </OwnerBlock>
        </TouchableOpacity>
      </OwnerContainer>
      <SharedButton message="test" />
    </BetweenContainer>
  );
}
