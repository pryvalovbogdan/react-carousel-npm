import * as React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import 'jest-canvas-mock';

import { Carousel, CarouselContextProvider } from '../src';

const mockCards = [
  { key: '1', title: 'Card 1' },
  { key: '2', title: 'Card 2' },
  { key: '3', title: 'Card 3' },
];

const Card = (props: any) => <div>{props.title}</div>;
describe('Carousel test render', () => {
  it('snapshot Carousel', () => {
    const { baseElement } = render(
      <Carousel i18n={'Cards'} cards={mockCards} defaultCardsCount={1}>
        <Card />
      </Carousel>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('renders carousel container', () => {
    const { getByTestId } = render(
      <Carousel i18n={'Cards'} cards={mockCards} defaultCardsCount={1}>
        <Card />
      </Carousel>,
    );
    const carouselContainer = getByTestId('carousel-Cards');

    expect(carouselContainer).toBeInTheDocument();
  });

  it('handles next page click', () => {
    const { getByTestId } = render(
      <CarouselContextProvider>
        <Carousel i18n={'Cards'} cards={mockCards} defaultCardsCount={1}>
          <Card />
        </Carousel>
      </CarouselContextProvider>,
    );
    const nextButton = getByTestId('pagination-Button3');
    fireEvent.click(nextButton);

    const activePageButton = getByTestId('pagination-Button3');
    expect(activePageButton).toHaveStyle('background-color: hsla(200, 85%, 60%, 0.8)');
  });

  it('handles previous page click', () => {
    const { getByTestId } = render(
      <CarouselContextProvider>
        <Carousel i18n={'Cards'} cards={mockCards} defaultCardsCount={1} defaultActivePage={2}>
          <Card />
        </Carousel>
      </CarouselContextProvider>,
    );
    const previousButton = getByTestId('pagination-Button1');
    fireEvent.click(previousButton);

    const activePageButton = getByTestId('pagination-Button1');
    expect(activePageButton).toHaveStyle('background-color: hsla(200, 85%, 60%, 0.8)');
  });
});
