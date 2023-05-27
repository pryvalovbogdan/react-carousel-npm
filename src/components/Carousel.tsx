import React, { useEffect, useRef, useState } from 'react';

import { CarouselProps, UseResizeProps } from '../types/CarouselTypes';
import { useCarousel } from '../hooks/useCarusel';
import { useResize } from '../hooks/useResize';
import { renderChild, renderChildren, setNextPage, setPrevPage } from '../utils';
import stylesCss from '../styles/carousel.module.css';
import SideCard from './SideCard';
import CustomArrowsWrapper from './CustomArrowsWrapper';
import { useCarouselContext } from '../hooks/useCaruselContext';
import { useAnimation } from '../hooks/useAnimation';

const Carousel: React.FC<CarouselProps> = ({
  i18n,
  defaultActivePage,
  defaultCardsCount,
  variant = 'regular',
  disabled,
  cards = [],
  cardWidth = 300,
  cardContainerStyles,
  carouselContainerStyles,
  paginationButtonStyles,
  marginCard = 1,
  header,
  noCardsText = 'No cards selected',
  children,
  CustomArrowBtn,
  CustomPaginationBtn,
  CustomNoCardsBlock,
  withAnimation,
}) => {
  const [selected, setSelected] = useState<number>(defaultCardsCount || 3);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [currentPageLocal, setCurrentPageLocal] = useState<number>(1);

  const ref = useRef<HTMLDivElement>(null!);
  const refCard = useRef<HTMLDivElement>(null!);

  const {
    currentPage: contextCurrentPage,
    onCurrentPage: contextOnCurrentPage,
    handlePrevPage: contextHandlePrevPage,
    handleNextPage: contextHandleNextPage,
    onTotalPageCountChange,
  } = useCarouselContext();

  let currentPage = contextCurrentPage || 1;
  let handleNextPage = contextHandleNextPage;
  let onCurrentPage = contextOnCurrentPage;
  let handlePrevPage = contextHandlePrevPage;

  if (!contextCurrentPage) {
    currentPage = currentPageLocal;
    handleNextPage = setNextPage(setCurrentPageLocal);
    onCurrentPage = setCurrentPageLocal;
    handlePrevPage = setPrevPage(setCurrentPageLocal);
  }

  const isPaginationShown: boolean = variant !== 'withoutPagination' && !variant.includes('withoutPagination');
  const isArrowsShown: boolean = variant !== 'withoutArrows' && !variant.includes('withoutArrows');
  const isSideCardsShown: boolean = variant === 'withSideCards' || variant.includes('withSideCards');
  const isRegularCardsShown: boolean = variant === 'regular' || variant.includes('regular');

  const { totalPageCount, selectedCards } = useCarousel({
    selected,
    cards,
    currentPage,
    isSideCardsShown,
  });

  const { width, widthCard } = useResize({
    ref,
    setSelected,
    cardWidth,
    refCard,
    isRegularCardsShown,
  } as UseResizeProps);

  const { isAnimate } = useAnimation({ withAnimation, selectedCards });

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 10) {
      /** Swipe Right **/
      if (currentPage < totalPageCount) {
        handleNextPage();
      }
    }

    if (touchStart - touchEnd < -10) {
      /** Swipe Left **/
      if (currentPage > 1) {
        handlePrevPage();
      }
    }
  };

  const keyDownHandle = (e: KeyboardEvent) => {
    /** Key arrow Right **/
    if (e.key === 'ArrowRight') {
      if (currentPage < totalPageCount) {
        handleNextPage();
      }
    }
    /** Key arrow Left **/
    if (e.key === 'ArrowLeft') {
      handlePrevPage();
    }
  };

  const paginationHandle = (index: number) => {
    onCurrentPage(index + 1);
  };

  useEffect(() => {
    if (defaultActivePage) {
      onCurrentPage(defaultActivePage);
    }
  }, [defaultActivePage, onCurrentPage]);

  useEffect(() => {
    onTotalPageCountChange(totalPageCount);
  }, [totalPageCount, onTotalPageCountChange]);

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandle);

    return () => window.removeEventListener('keydown', keyDownHandle);
  }, [keyDownHandle]);

  return (
    <div
      className={stylesCss['carousel-container']}
      ref={ref}
      style={carouselContainerStyles}
      data-testid={`carousel-${i18n}`}
    >
      <div className={stylesCss['carousel-container__header']}>
        {header}
        {isArrowsShown && totalPageCount > 1 && (
          <CustomArrowsWrapper
            CustomArrowBtn={CustomArrowBtn}
            currentPage={currentPage}
            lastPage={totalPageCount}
            disabled={disabled}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        )}
      </div>
      <div
        className={stylesCss['carousel-container__body']}
        data-testid='carousel-container__body'
        style={cardContainerStyles}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={refCard} style={{ height: 0, width: '100%', maxWidth: cardWidth + 'px' }} />
        <div
          style={{
            gap: marginCard + 'px',
            display: 'flex',
            width: '100%',
            ...(withAnimation && {
              opacity: isAnimate ? '1' : '0',
              transition: 'opacity 0.5s ease-in-out',
            }),
            ...(withAnimation?.animateIn && isAnimate ? withAnimation.animateIn : withAnimation?.animateOut),
            ...cardContainerStyles,
          }}
        >
          {!cards.length ? (
            <>
              {CustomNoCardsBlock ? (
                renderChild(CustomNoCardsBlock, {
                  noCardsText,
                })
              ) : (
                <div className={stylesCss['no-cards-container']}>
                  <span className={stylesCss['carousel-container__text']}>{noCardsText}</span>
                </div>
              )}
            </>
          ) : (
            selectedCards.map((item, index) => {
              if (!isAnimate && withAnimation) {
                return renderChildren(children, {
                  ...item,
                  style: {
                    maxWidth: cardWidth,
                    visibility: 'hidden',
                  },
                });
              }

              if (isSideCardsShown) {
                if (totalPageCount > 1 && selectedCards.length < 2) {
                  return (
                    <div key='no-cards-container' className={stylesCss['no-cards-container']}>
                      <span className={stylesCss['carousel-container__text']}>{noCardsText}</span>
                    </div>
                  );
                }

                if (
                  (index === 0 && currentPage !== 1) ||
                  (selected < selectedCards.length && index === selectedCards.length - 1) ||
                  (index === selected - 1 && currentPage === 1)
                ) {
                  return (
                    <SideCard
                      index={index}
                      item={item}
                      width={width}
                      key={item.key}
                      selected={selected}
                      cardWidth={cardWidth}
                      widthCard={widthCard}
                      marginCard={marginCard}
                      child={children}
                    />
                  );
                }
              }

              return renderChildren(children, {
                ...item,
                style: {
                  ...styles.card,
                  maxWidth: cardWidth,
                },
              });
            })
          )}
        </div>
      </div>
      {isPaginationShown && totalPageCount > 1 && (
        <div className={stylesCss['carousel-container__pagination-box']}>
          {[...cards].splice(0, totalPageCount).map((item, index) => {
            return CustomPaginationBtn ? (
              renderChild(CustomPaginationBtn, {
                onClick: () => paginationHandle(index),
                key: `${item.key}-button`,
                disabled: disabled,
                isActivePage: currentPage === index + 1,
              })
            ) : (
              <button
                className={stylesCss['pagination-button']}
                disabled={disabled}
                key={`${item.key}-button`}
                onClick={() => paginationHandle(index)}
                style={{
                  ...paginationButtonStyles,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  backgroundColor: currentPage === index + 1 ? 'hsla(200, 85%, 60%, 0.8)' : 'rgba(0, 0, 0, 0.1)',
                }}
                data-testid={`pagination-Button${index + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Carousel;

const styles = {
  card: {
    width: '100%',
  },
};
