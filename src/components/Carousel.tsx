import { Box } from './Box/Box';
import React, { ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import {
  CarouselProps,
  UseCarouselProps,
  UseCarouselReturnedValues,
  UseResizeProps,
  UseResizeReturnedValues,
} from '../types/CarouselTypes';

const useCarousel = ({ selected, cards, currentPage }: UseCarouselProps): UseCarouselReturnedValues => {
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

const useResize = ({ ref, setSelected, cardWidth }: UseResizeProps): UseResizeReturnedValues => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (width) {
      const selected = Math.ceil(width / cardWidth);

      setSelected(selected > 1 ? selected : 2);
    }
  }, [width, cardWidth, setSelected]);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (ref && ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    window.addEventListener('resize', updateSize);

    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return { width, setWidth };
};

const renderChildren = (children: React.ReactNode, props: any) => {
  return React.Children.map<ReactNode, ReactNode>(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }

    return child;
  });
};

const Carousel: React.FC<CarouselProps> = ({
  i18n,
  defaultActivePage,
  defaultCardsCount,
  variant,
  disabled,
  cards = [],
  cardWidth = 300,
  cardContainerStyles,
  carouselContainerStyles,
  paginationButtonStyles,
  marginCard = 0,
  header,
  noCardsText,
  children,
}) => {
  const [selected, setSelected] = useState(defaultCardsCount || 3);
  const [currentPage, onPageChange] = useState(defaultActivePage || 1);

  const ref = useRef<HTMLDivElement>(null!);

  const { pageWithoutDots, totalPageCount, selectedCards } = useCarousel({
    selected,
    cards,
    currentPage,
  });

  const { width } = useResize({ ref, setSelected, cardWidth } as UseResizeProps);

  const goToNextPage = () => onPageChange(currentPage + 1);

  const goToPrevPage = () => onPageChange(currentPage - 1);

  if (totalPageCount < currentPage && totalPageCount > 0) {
    onPageChange(totalPageCount);
  }

  return (
    <Box
      display={'flex'}
      justifyContent='end'
      flexDirection='column'
      alignItems='end'
      overflow='hidden'
      width='100%'
      ref={ref}
      style={carouselContainerStyles}
      data-testid={`Carousel-${i18n}`}
    >
      {variant !== 'withoutArrows' && !!cards.length && (
        <Box display={'flex'} justifyContent='space-between' alignItems='center' width='100%'>
          {header}
          {totalPageCount > 1 && (
            <Box>
              <Box style={styles.navButton} color='neutral' onClick={goToPrevPage}>
                Prev
              </Box>

              <Box style={styles.navButton} color='neutral' onClick={goToNextPage}>
                Next
              </Box>
            </Box>
          )}
        </Box>
      )}
      <Box display={'flex'} justifyContent='start' width={1} style={cardContainerStyles}>
        {!cards.length ? (
          <Box
            width={1}
            mt='20px'
            borderRadius='12px'
            height='200px'
            display={'flex'}
            justifyContent='center'
            alignItems='center'
            backgroundColor={'grey'}
          >
            <Box fontSize='14px' color={'white'}>
              {noCardsText}
            </Box>
          </Box>
        ) : (
          selectedCards.map((item, index) => {
            if (totalPageCount > 1 && selectedCards.length < 2) {
              return (
                <Box
                  display={'flex'}
                  width={1}
                  key={'no-cards'}
                  mt='20px'
                  borderRadius='12px'
                  height='200px'
                  justifyContent='center'
                  alignItems='center'
                  backgroundColor={'grey'}
                >
                  <Box fontSize='14px' color={'white'}>
                    {noCardsText}
                  </Box>
                </Box>
              );
            }

            if (
              (index === 0 && currentPage !== 1) ||
              (selected < selectedCards.length && index === selectedCards.length - 1) ||
              (index === selected - 1 && currentPage === 1)
            ) {
              return (
                <Box position={'absolute'} height={0} width='100%' right={index === 0 ? 'auto' : 0} key={item.key}>
                  {renderChildren(children, {
                    ...item,
                    style: styles.sideCardParent,
                  })}
                  {renderChildren(children, {
                    ...item,
                    style: {
                      ...styles.sideCardChild,
                      right:
                        index === 0
                          ? `calc(100% + ${marginCard}px`
                          : `${width <= cardWidth ? '-95%' : width - selected * cardWidth - marginCard * 2 + 'px'}`,
                    },
                  })}
                </Box>
              );
            }

            return renderChildren(children, {
              ...item,
              style: {
                ...styles.card,
                marginLeft: (index === 0 && currentPage === 1) || (index === 1 && currentPage !== 1) ? 0 : marginCard,
                marginRight: selectedCards.length > selected && index === selectedCards.length - 2 ? 0 : marginCard,
              },
            });
          })
        )}
      </Box>
      {variant !== 'withoutPagination' && !!cards.length && totalPageCount > 1 && (
        <Box width={1} display={'flex'} justifyContent='center' mt='8px' overflowX='auto'>
          {[...cards].splice(0, totalPageCount).map((item, index) => {
            return (
              <Box
                width={24}
                height={4}
                border='none'
                mr='8px'
                key={`${item.key}-button`}
                backgroundColor={currentPage === index + 1 ? 'orange' : 'grey'}
                borderRadius='2px'
                onClick={() => onPageChange(index + 1)}
                style={{ ...paginationButtonStyles, cursor: disabled ? 'not-allowed' : 'pointer' }}
                data-testid={`pagination-Button${index + 1}`}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Carousel;

const styles = {
  card: {
    width: '100%',
  },
  sideCardParent: {
    width: '30%',
    height: '0',
    overflow: 'hidden',
    border: 'none',
  },
  sideCardChild: {
    position: 'absolute',
    top: 0,
  },
  navButton: {
    padding: '0 10px 0 12px',
  },
};
