import { render } from '@testing-library/react';

import React from 'react';
import CustomArrowsWrapper from '../src/components/CustomArrowsWrapper';

describe('Test CustomArrowsWrapper', () => {
  const CustomArrowBtn = <div>Child content</div>;

  test('snapshot Notes', () => {
    const { baseElement } = render(
      <CustomArrowsWrapper
        currentPage={1}
        CustomArrowBtn={CustomArrowBtn}
        disabled={false}
        lastPage={2}
        handlePrevPage={() => {}}
        handleNextPage={() => {}}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
