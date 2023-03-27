import React from 'react';

export interface CarouselProps {
  i18n: string;
  defaultCardsCount?: number;
  defaultActivePage?: number;
  variant?: 'carousels' | 'withoutArrows' | 'withoutPagination';
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
}

export interface UseCarouselProps {
  selected?: number | any;
  cards: any[];
  currentPage: number;
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
