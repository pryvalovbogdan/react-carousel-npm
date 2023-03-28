import { UseCarouselProps, UseCarouselReturnedValues } from '../types/CarouselTypes';
import { useMemo } from 'react';

export const useCarousel = ({ selected, cards, currentPage }: UseCarouselProps): UseCarouselReturnedValues => {
  const totalCount = cards.length;

  const range = (start: number, end: number) => {
    const length = end - start;

    return Array.from({ length }, (_, idx) => idx + 1);
  };

  const selectedCards = cards.filter((_el, index) => {
    if (currentPage !== 1) {
      return (currentPage - 1) * selected <= index + currentPage && index + currentPage - 1 < currentPage * selected;
    }

    return (currentPage - 1) * selected <= index && index < currentPage * selected;
  });

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / selected + ((totalCount / selected) * 2 - 1) / selected);

    const pageWithoutDots = range(0, totalPageCount);

    return { pageWithoutDots, totalPageCount };
  }, [totalCount, selected]);

  return { ...paginationRange, selectedCards };
};
