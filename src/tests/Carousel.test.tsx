import * as React from 'react';
import { render } from '@testing-library/react';

import 'jest-canvas-mock';

import { Carousel } from '../';

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <Carousel i18n={'Cards'} cards={[]}>
        <div>Card description</div>
      </Carousel>,
    );
  });
});
