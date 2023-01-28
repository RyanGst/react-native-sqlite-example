import {Dimensions, Platform, PixelRatio} from 'react-native';
import styled from 'styled-components/native';

export const {width: SCREEN_WIDTH} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const fontSize = {
  xl: normalize(20),
  lg: normalize(18),
  md: normalize(14),
  sm: normalize(12),
  xsm: normalize(10),
  xxsm: normalize(8),
};

const fontFamily = {
  bold: 'Poppins-Bold',
  regular: 'Poppins-Regular',
  italic: 'Poppins-Italic',
};

interface TextProps {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xsm' | 'xxsm';
  font?: 'bold' | 'regular' | 'italic';
  color?: string;
}

export const StyledText = styled.Text<TextProps>`
  font-family: ${props => fontFamily[props.font ?? 'regular']};
  font-size: ${props => fontSize[props.size ?? 'sm']}px;
  color: ${props => props.color || '#202020'};
`;
