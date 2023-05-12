import React, { createContext, useContext, useState, Context } from 'react';

import { ICarouselContext } from '../types/CarouselTypes';
import { setNextPage, setPrevPage } from '../utils';

const defaultContext: ICarouselContext = {
  totalPageCount: 1,
  handleNextPage: () => {},
  handlePrevPage: () => {},
  onCurrentPage: () => {},
  onTotalPageCountChange: () => {},
};
export const CarouselContext: Context<ICarouselContext> = createContext(defaultContext);

export const CarouselContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, onCurrentPage] = useState<number>(1);
  const [totalPageCount, onTotalPageCountChange] = useState<number>(1);

  const handleNextPage = setNextPage(onCurrentPage);
  const handlePrevPage = setPrevPage(onCurrentPage);

  return (
    <CarouselContext.Provider
      value={{ currentPage, onCurrentPage, handlePrevPage, handleNextPage, totalPageCount, onTotalPageCountChange }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

export const useCarouselContext = (): ICarouselContext => {
  return useContext(CarouselContext);
};
