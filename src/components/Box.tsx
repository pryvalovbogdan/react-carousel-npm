import {
  compose,
  space,
  layout,
  typography,
  color,
  flexbox,
  position,
  border,
  shadow,
  background,
} from 'styled-system';
import styled from 'styled-components';
import css, { get } from '@styled-system/css';
import shouldForwardProp from '@styled-system/should-forward-prop';
import { BoxProps } from '../types/BoxTypes';

const base = (props: BoxProps) => css(props.__css)(props.theme);
const variant = ({ theme, variant = '', tx = 'variants' }: BoxProps) =>
  css(get(theme, tx + '.' + variant, get(theme, variant)))(theme);

export const Box = styled('div').withConfig({
  shouldForwardProp: prop => shouldForwardProp(prop),
})<BoxProps>(
  {
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
  },
  base,
  variant,
  (props: BoxProps) => props.css,
  compose(space, layout, typography, color, flexbox, position, border, shadow, background),
);

export default Box;
