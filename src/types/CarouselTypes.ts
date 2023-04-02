import React from 'react';

export interface CarouselProps {
  i18n: string;
  defaultCardsCount?: number;
  defaultActivePage?: number;
  variant?: 'regular' | 'withoutArrows' | 'withoutPagination' | 'withSideCards';
  disabled?: boolean;
  cards: any[];
  children: React.ReactNode;
  cardWidth?: number;
  cardContainerStyles?: React.CSSProperties;
  carouselContainerStyles?: React.CSSProperties;
  paginationButtonStyles?: React.CSSProperties;
  marginCard?: number;
  noCardsText?: string;
  header?: React.ReactNode;
  CustomArrowBtn?: React.ReactNode;
  CustomPaginationBtn?: React.ReactNode;
}

export interface UseCarouselProps {
  selected?: number | any;
  cards: any[];
  currentPage: number;
  variant?: string;
}

export interface UseCarouselReturnedValues {
  pageWithoutDots: any[];
  totalPageCount: number;
  selectedCards: any[];
}

export interface UseResizeProps {
  ref: React.RefObject<any>;
  setSelected: (prop: number) => void;
  cardWidth: number;
}

export interface UseResizeReturnedValues {
  width: number;
  setWidth: (width: number) => void;
}

export interface IHeaderArrows {
  disabled: boolean | undefined;
  currentPage: number;
  lastPage: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}
