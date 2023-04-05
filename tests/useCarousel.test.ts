import { renderHook } from '@testing-library/react-hooks';
import { useCarousel } from '../src/hooks/useCarusel';

describe('useCarousel', () => {
  const cards = [
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' },
    { id: 3, title: 'Card 3' },
    { id: 4, title: 'Card 4' },
    { id: 5, title: 'Card 5' },
    { id: 6, title: 'Card 6' },
    { id: 7, title: 'Card 7' },
    { id: 8, title: 'Card 8' },
    { id: 9, title: 'Card 9' },
  ];

  const props = {
    selected: 3,
    cards,
    currentPage: 1,
    variant: 'withSideCards',
  };

  it('should return the correct selected cards for the first page', () => {
    const { result } = renderHook(() => useCarousel(props));
    const { selectedCards } = result.current;

    expect(selectedCards).toHaveLength(3);
    expect(selectedCards[0].title).toBe('Card 1');
    expect(selectedCards[1].title).toBe('Card 2');
    expect(selectedCards[2].title).toBe('Card 3');
  });

  it('should return the correct selected cards for the second page', () => {
    const { result } = renderHook(() => useCarousel({ ...props, currentPage: 2 }));
    const { selectedCards } = result.current;

    expect(selectedCards).toHaveLength(4);
    expect(selectedCards[0].title).toBe('Card 2');
    expect(selectedCards[1].title).toBe('Card 3');
    expect(selectedCards[2].title).toBe('Card 4');
  });

  it('should return the correct pagination range', () => {
    const { result } = renderHook(() => useCarousel(props));
    const totalPageCount = result.current.totalPageCount;
    const pageWithoutDots = result.current.rangeBottomPagination;

    expect(totalPageCount).toBe(5);
    expect(pageWithoutDots).toHaveLength(5);
    expect(pageWithoutDots[0]).toBe(1);
    expect(pageWithoutDots[1]).toBe(2);
    expect(pageWithoutDots[2]).toBe(3);
  });
});
