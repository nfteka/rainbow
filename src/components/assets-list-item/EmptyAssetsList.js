import { times } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { Centered, Column } from '../layout';
import AssetsListItemSkeleton from './AssetsListItemSkeleton';
import { position } from '@rainbow-me/styles';

const Container = styled(Column)`
  ${position.size('100%')};
  background-color: ${props => (props.color ? props.color : 'transparent')};
`;

const EmptyAssetsList = ({
  descendingOpacity,
  animated,
  skeletonCount = 5,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Container color={colors.blueGreyDarkLight} {...props}>
      <Centered flex={1}>
        <Column cover>
          {times(skeletonCount, index => (
            <AssetsListItemSkeleton
              animated={!animated}
              descendingOpacity={descendingOpacity || animated}
              index={index}
              key={`skeleton${index}`}
            />
          ))}
        </Column>
      </Centered>
    </Container>
  );
};

export default EmptyAssetsList;
