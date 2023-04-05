import { render } from '@testing-library/react';

import React from 'react';
import SideCard from '../src/components/SideCard';

describe('Test SideCard', () => {
  const child = <div>Child content</div>;
  const cardWidth = 200;
  const item = { key: 'item-key', title: 'Item title' };
  const width = 800;
  const index = 1;
  const selected = 3;
  const widthCard = 150;
  const marginCard = 10;

  test('snapshot Notes', () => {
    const { baseElement } = render(
      <SideCard
        child={child}
        cardWidth={cardWidth}
        item={item}
        width={width}
        index={index}
        selected={selected}
        widthCard={widthCard}
        marginCard={marginCard}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
