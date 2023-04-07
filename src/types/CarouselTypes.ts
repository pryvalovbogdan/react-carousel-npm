import React from 'react';

type VariantType = 'regular' | 'withoutArrows' | 'withoutPagination' | 'withSideCards';

export interface CarouselProps {
  i18n: string;
  cards: any[];
  header?: React.ReactNode;
  variant?: VariantType;
  children: React.ReactNode;
  cardWidth?: number;
  disabled?: boolean;
  marginCard?: number;
  noCardsText?: string;
  CustomArrowBtn?: React.ReactNode;
  CustomPaginationBtn?: React.ReactNode;
  defaultCardsCount?: number;
  defaultActivePage?: number;
  cardContainerStyles?: React.CSSProperties;
  carouselContainerStyles?: React.CSSProperties;
  paginationButtonStyles?: React.CSSProperties;
  CustomNoCardsBlock?: React.ReactNode;
}

export interface UseCarouselProps {
  selected?: number | any;
  cards: any[];
  currentPage: number;
  variant?: VariantType;
}

export interface UseCarouselReturnedValues {
  rangeBottomPagination: any[];
  totalPageCount: number;
  selectedCards: any[];
}

export interface UseResizeProps {
  ref: React.RefObject<any>;
  refCard: React.RefObject<any>;
  setSelected: (prop: number) => void;
  cardWidth: number;
  variant: VariantType;
}

export interface UseResizeReturnedValues {
  width: number;
  setWidth: (width: number) => void;
  widthCard: number;
}

export interface IHeaderArrows {
  disabled: boolean | undefined;
  currentPage: number;
  lastPage: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}

export interface ISideCard {
  child: React.ReactNode;
  cardWidth: number | undefined;
  item: any;
  width: number;
  index: number;
  selected: number;
  widthCard: number;
  marginCard: number | undefined;
}

export interface ICustomArrowsWrapper {
  CustomArrowBtn: React.ReactNode;
  disabled: boolean | undefined;
  currentPage: number;
  lastPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}
