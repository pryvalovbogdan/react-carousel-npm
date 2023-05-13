import { UseCarouselProps, UseCarouselReturnedValues } from '../types/CarouselTypes';
import { useMemo } from 'react';

export const useCarousel = ({
  selected,
  cards,
  currentPage,
  isSideCardsShown,
}: UseCarouselProps): UseCarouselReturnedValues => {
  const totalCount = cards.length;

  const range = (start: number, end: number) => {
    const length = end - start;

    return Array.from({ length }, (_, idx) => idx + 1);
  };

  const selectedCards = cards.filter((_el, index) => {
    if (currentPage !== 1 && isSideCardsShown) {
      return (currentPage - 1) * selected <= index + currentPage && index + currentPage - 1 < currentPage * selected;
    }

    return (currentPage - 1) * selected <= index && index < currentPage * selected;
  });

  const paginationRange = useMemo(() => {
    let totalPageCount = totalCount / selected;

    if (isSideCardsShown) {
      totalPageCount += ((totalCount / selected) * 2 - 1) / selected;
    }

    const totalPageCountRound = Math.ceil(totalPageCount);

    const rangeBottomPagination = range(0, totalPageCountRound);

    return { rangeBottomPagination, totalPageCount: totalPageCountRound };
  }, [totalCount, selected, isSideCardsShown]);

  return { ...paginationRange, selectedCards };
};
