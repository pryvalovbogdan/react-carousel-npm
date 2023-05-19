import { UseCarouselProps, UseCarouselReturnedValues } from '../types/CarouselTypes';
import { useMemo } from 'react';

export const useCarousel = ({
  selected,
  cards,
  currentPage,
  isSideCardsShown,
}: UseCarouselProps): UseCarouselReturnedValues => {
  const totalCount = cards.length;

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

    return { totalPageCount: totalPageCountRound };
  }, [totalCount, selected, isSideCardsShown]);

  return { ...paginationRange, selectedCards };
};
