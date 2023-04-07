import React, { useRef, useState } from 'react';

import { CarouselProps, UseResizeProps } from '../types/CarouselTypes';
import { useCarousel } from '../hooks/useCarusel';
import { useResize } from '../hooks/useResize';
import { renderChild, renderChildren } from '../utils';
import stylesCss from '../styles/carousel.module.css';
import SideCard from './SideCard';
import CustomArrowsWrapper from './CustomArrowsWrapper';

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
}) => {
  const [selected, setSelected] = useState<number>(defaultCardsCount || 3);
  const [currentPage, onCurrentPage] = useState<number>(defaultActivePage || 1);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const handleNextPage = () => onCurrentPage(currentPage + 1);
  const handlePrevPage = () => onCurrentPage(currentPage - 1);

  const ref = useRef<HTMLDivElement>(null!);
  const refCard = useRef<HTMLDivElement>(null!);

  const { rangeBottomPagination, totalPageCount, selectedCards } = useCarousel({
    selected,
    cards,
    currentPage,
    variant,
  });

  const { width, widthCard } = useResize({ ref, setSelected, cardWidth, refCard, variant } as UseResizeProps);

  const lastPage = rangeBottomPagination && rangeBottomPagination[rangeBottomPagination.length - 1];

  if (totalPageCount < currentPage && totalPageCount > 0) {
    onCurrentPage(totalPageCount);
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 10) {
      /** Swipe Right **/
      if (currentPage < lastPage) {
        onCurrentPage(currentPage + 1);
      }
    }

    if (touchStart - touchEnd < -10) {
      /** Swipe Left **/
      if (currentPage > 1) {
        onCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div
      className={stylesCss['carousel-container']}
      ref={ref}
      style={carouselContainerStyles}
      data-testid={`carousel-${i18n}`}
    >
      <div className={stylesCss['carousel-container__header']}>
        {header}
        {variant !== 'withoutArrows' && totalPageCount > 1 && (
          <CustomArrowsWrapper
            CustomArrowBtn={CustomArrowBtn}
            currentPage={currentPage}
            lastPage={lastPage}
            disabled={disabled}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        )}
      </div>
      <div
        className={stylesCss['carousel-container__body']}
        style={cardContainerStyles}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => handleTouchEnd()}
      >
        <div ref={refCard} style={{ height: 0, width: '100%', maxWidth: cardWidth + 'px' }} />
        <div style={{ gap: marginCard + 'px', display: 'flex', width: '100%', ...cardContainerStyles }}>
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
              if (variant === 'withSideCards') {
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
      {variant !== 'withoutPagination' && totalPageCount > 1 && (
        <div className={stylesCss['carousel-container__pagination-box']}>
          {[...cards].splice(0, totalPageCount).map((item, index) => {
            return CustomPaginationBtn ? (
              renderChild(CustomPaginationBtn, {
                onClick: () => onCurrentPage(index + 1),
                key: `${item.key}-button`,
                disabled: disabled,
                isActivePage: currentPage === index + 1,
              })
            ) : (
              <button
                className={stylesCss['pagination-button']}
                disabled={disabled}
                key={`${item.key}-button`}
                onClick={() => onCurrentPage(index + 1)}
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
