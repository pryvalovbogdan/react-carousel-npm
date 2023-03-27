import {
  BackgroundProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  StylesProps,
  BorderProps,
  FontSizeProps,
} from 'styled-system';
import { CSSProp } from 'styled-components';

export interface BoxProps
  extends ColorProps,
    LayoutProps,
    SpaceProps,
    FlexboxProps,
    ShadowProps,
    BackgroundProps,
    GridProps,
    PositionProps,
    BorderProps,
    FontSizeProps {
  __css?: StylesProps;
  theme: object;
  variant?: string;
  tx?: string;
  css?: CSSProp;
}
