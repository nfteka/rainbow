import React, { useMemo } from 'react';
import { HeaderButton } from '../header';
import { Centered } from '../layout';
import { borders } from '@rainbow-me/styles';
import ShadowStack from 'react-native-shadow-stack';

const CircleHeaderButtonShadows = colors => [
  [0, 2, 3, colors.shadow, 0.1],
  // [0, 3, 5, colors.shadow, 0.2],
];

export default function CircleHeaderButton({ children, ...props }) {
  const { colors } = useTheme();

  const shadows = useMemo(() => CircleHeaderButtonShadows(colors), [colors]);

  return (
    <HeaderButton {...props}>
      <ShadowStack
        {...borders.buildCircleAsObject(45)}
        backgroundColor={colors.whiteBlueGrey}
        shadows={shadows}
      >
        <Centered cover>{children}</Centered>
      </ShadowStack>
    </HeaderButton>
  );
}
