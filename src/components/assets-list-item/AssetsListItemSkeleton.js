import MaskedView from '@react-native-community/masked-view';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Clock,
  Easing,
  timing,
  Value,
} from 'react-native-reanimated';
import styled from 'styled-components';
import { withThemeContext } from '../../context/ThemeContext';
import { deviceUtils } from '../../utils';
import { interpolate } from '../animations';
import { ColumnWithMargins, Row, RowWithMargins } from '../layout';
import { padding, position } from '@rainbow-me/styles';

const { block, cond, set, startClock, stopClock } = Animated;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Container = styled.View`
  height: 600px;
  opacity: ${({ descendingOpacity, index }) =>
    1 - 0.05 * (descendingOpacity ? index : 0)};
  width: 100%;
`;

const FakeAvatar = styled.View`
  ${position.size(32)};
  background-color: ${({ theme: { colors } }) => colors.white};
  border-radius: 16px;
`;

const FakeButton = styled.View`
  height: 35px;
  width: 100px;
  background-color: ${({ theme: { colors } }) => colors.white};
  border-radius: 14px;
`;

const FakeRow = styled(Row).attrs({
  align: 'flex-end',
  flex: 0,
  height: 10,
  justify: 'space-between',
  paddingBottom: 5,
  paddingTop: 5,
})(Row);

const FakeRowText = styled.View`
  margin-bottom: 10px;
`;

const FakeText = styled.View`
  background-color: ${({ theme: { colors } }) => colors.white};
  border-radius: 5px;
  height: 10px;
`;

const ItemContainer = styled.View`
  margin-top: 20px;
`;

const FakeTextContainer = styled.View`
  margin-top: 16px;
`;

const FakeButtonContainer = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;

const FakeImage = styled.View`
  background-color: ${({ theme: { colors } }) => colors.white};
  border-radius: 5px;
  margin-top: 8px;
  height: 400px;
  width: 100%;
`;

const Wrapper = styled(RowWithMargins).attrs({
  align: 'flex-start',
  justify: 'space-between',
  margin: 10,
})`
  ${padding(5, 15, 5, 15)};
  background-color: ${({ theme: { colors } }) => colors.transparent};
`;

class AssetsListItemSkeleton extends PureComponent {
  static propTypes = {
    animated: PropTypes.bool,
    descendingOpacity: PropTypes.bool,
    index: PropTypes.number,
  };

  static defaultProps = {
    animated: true,
    index: 0,
  };

  startShimmerLoop() {
    const clock = new Clock();

    const config = {
      duration: new Value(1250),
      easing: Easing.linear,
      toValue: new Value(1),
    };

    const state = {
      finished: new Value(0),
      frameTime: new Value(0),
      position: new Value(0),
      time: new Value(0),
    };

    return block([
      startClock(clock),
      timing(clock, state, config),
      cond(state.finished, [
        stopClock(clock),
        set(state.finished, 0),
        set(state.position, 0),
        set(state.time, 0),
        set(state.frameTime, 0),
      ]),
      state.position,
    ]);
  }

  animation = this.props.animated && ios ? this.startShimmerLoop() : () => null;

  renderShimmer() {
    const { colors } = this.props;
    const gradientColors = [
      colors.skeleton,
      colors.shimmer,
      colors.skeleton,
      colors.skeleton,
    ];

    const gradientSteps = [0, 0.2, 0.4, 1];

    const translateX = interpolate(this.animation, {
      inputRange: [0, 1],
      outputRange: [
        deviceUtils.dimensions.width * -1.17,
        deviceUtils.dimensions.width * 1.17,
      ],
    });

    return (
      <View backgroundColor={gradientColors[0]} css={position.size('100%')}>
        <AnimatedLinearGradient
          {...position.sizeAsObject('100%')}
          colors={gradientColors}
          end={{ x: 1, y: 0.5 }}
          locations={gradientSteps}
          start={{ x: 0, y: 0.5 }}
          style={{ transform: [{ translateX }] }}
        />
      </View>
    );
  }

  render() {
    const { animated, descendingOpacity, index, colors } = this.props;

    const skeletonElement = (
      <ItemContainer>
        <Wrapper index={index}>
          <FakeAvatar />
          <ColumnWithMargins
            backgroundColor={colors.transparent}
            flex={1}
            margin={10}
          >
            <FakeRow>
              <FakeText width={60} />
            </FakeRow>
            <FakeRow>
              <FakeText width={100} />
            </FakeRow>
          </ColumnWithMargins>
          <FakeAvatar />
        </Wrapper>
        <Wrapper index={index}>
          <FakeImage />
        </Wrapper>
        <Wrapper>
          <FakeTextContainer>
            <FakeRowText>
              <FakeRow>
                <FakeText width={300} />
              </FakeRow>
            </FakeRowText>
            <FakeRowText>
              <FakeRow>
                <FakeText width={250} />
              </FakeRow>
            </FakeRowText>
          </FakeTextContainer>
        </Wrapper>
        <Wrapper>
          <FakeButtonContainer>
            <FakeText width={150} />
            <FakeButton />
          </FakeButtonContainer>
        </Wrapper>
      </ItemContainer>
    );

    return (
      <Container descendingOpacity={descendingOpacity} index={index}>
        {animated && ios ? (
          <MaskedView maskElement={skeletonElement}>
            {this.renderShimmer()}
          </MaskedView>
        ) : (
          skeletonElement
        )}
      </Container>
    );
  }
}

export default withThemeContext(AssetsListItemSkeleton);
