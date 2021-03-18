import { times } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
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
  const [animation, setAnimation] = useState(animated);
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation(prevState => !prevState);
    }, 300);
    return () => clearInterval(interval);
  });
  return (
    <Container color={colors.blueGreyDarkLight} {...props}>
      <Centered flex={1}>
        <Column cover>
          <ScrollView>
            {times(skeletonCount, index => (
              <AssetsListItemSkeleton
                animated={animated}
                descendingOpacity={descendingOpacity || animation}
                index={index}
                key={`skeleton${index}`}
              />
            ))}
          </ScrollView>
        </Column>
      </Centered>
    </Container>
  );
};

export default EmptyAssetsList;
