import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import ImgixImage from '../images/ImgixImage';
import { Bold } from '../text';
import AssetsItemFooter from './AssetsItemFooter';
import AssetsItemHeader from './AssetsItemHeader';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';

const Container = styled.View`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const AssetText = styled(Bold).attrs({ numberOfLines: 3 })`
  font-size: 18px;
  line-height: 21.6px;
  flex-grow: 0;
`;

const AssetTextContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  margin-top: 16px;
`;

const ImageContainer = styled(TouchableOpacity).attrs({ activeOpacity: 0.8 })`
  max-height: 450px;
  margin-top: 8px;
`;

const Image = styled(ImgixImage)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

function AssetsListItem({ asset }) {
  const { navigate } = useNavigation();
  const onAssetPress = useCallback(
    () => navigate(Routes.ASSETS_ITEM, { asset }),
    [navigate]
  );
  return (
    <Container>
      <AssetsItemHeader owner={asset.owner} />
      <ImageContainer onPress={onAssetPress}>
        <Image
          source={{
            uri: asset.image_url,
          }}
        />
      </ImageContainer>
      <AssetTextContainer onPress={onAssetPress}>
        <AssetText>{asset.title}</AssetText>
      </AssetTextContainer>
      <AssetsItemFooter asset={asset} />
    </Container>
  );
}

export default memo(AssetsListItem);
