import React, { createContext, useContext, useState, Context } from 'react';

import { ICarouselContext } from '../types/CarouselTypes';

const defaultContext: ICarouselContext = {
  currentPage: 1,
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

  const handleNextPage = () => onCurrentPage(prevState => prevState + 1);
  const handlePrevPage = () => onCurrentPage(prevState => (prevState < 2 ? 1 : prevState - 1));

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
