import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HeaderArrows from '../src/components/HeaderArrows';

test('calls goToPrevPage when prev button is clicked', () => {
  const goToPrevPageMock = jest.fn();
  const { container } = render(
    <HeaderArrows
      disabled={false}
      currentPage={2}
      lastPage={10}
      goToPrevPage={goToPrevPageMock}
      goToNextPage={() => {}}
    />,
  );
  const prevButton = container.querySelectorAll('button')[0];
  fireEvent.click(prevButton);
  expect(goToPrevPageMock).toHaveBeenCalled();
});

test('calls goToNextPage when next button is clicked', () => {
  const goToNextPageMock = jest.fn();
  const { container } = render(
    <HeaderArrows
      disabled={false}
      currentPage={2}
      lastPage={10}
      goToPrevPage={() => {}}
      goToNextPage={goToNextPageMock}
    />,
  );

  const nextButton = container.querySelectorAll('button')[1];
  fireEvent.click(nextButton);
  expect(goToNextPageMock).toHaveBeenCalled();
});
