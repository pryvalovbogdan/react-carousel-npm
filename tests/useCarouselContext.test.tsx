import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CarouselContextProvider, useCarouselContext } from '../src';

// Helper function to render components with the CarouselContextProvider
const renderWithContext = (component: React.ReactNode) => {
  return render(<CarouselContextProvider>{component}</CarouselContextProvider>);
};

test('should update current page when next page is clicked', () => {
  // Render a component that uses the CarouselContext
  const TestComponent = () => {
    const { currentPage, handleNextPage } = useCarouselContext();

    return (
      <div>
        <span data-testid='currentPage'>{currentPage}</span>
        <button data-testid='nextButton' onClick={handleNextPage}>
          Next
        </button>
      </div>
    );
  };

  const { getByTestId } = renderWithContext(<TestComponent />);

  // Verify the initial state
  const currentPageElement = getByTestId('currentPage');
  expect(currentPageElement.textContent).toBe('0');

  // Simulate clicking the next button
  const nextButton = getByTestId('nextButton');
  fireEvent.click(nextButton);

  // Verify the updated state
  expect(currentPageElement.textContent).toBe('1');
});
