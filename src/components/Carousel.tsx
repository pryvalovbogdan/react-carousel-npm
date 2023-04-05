import React, { useRef, useState } from 'react';

import { CarouselProps, UseResizeProps } from '../types/CarouselTypes';
import { useCarousel } from '../hooks/useCarusel';
import { useResize } from '../hooks/useResize';
import { renderChild, renderChildren } from '../utils';
import stylesCss from '../styles/carousel.module.css';
import HeaderArrows from './HeaderArrows';

const Carousel: React.FC<CarouselProps> = ({
  i18n,
  defaultActivePage,
  defaultCardsCount,
  variant = 'regular',
  disabled,
  cards = [],
  cardWidth = 350,
  cardContainerStyles,
  carouselContainerStyles,
  paginationButtonStyles,
  marginCard = 1,
  header,
  noCardsText = 'No cards selected',
  children,
  CustomArrowBtn,
  CustomPaginationBtn,
}) => {
  const [selected, setSelected] = useState(defaultCardsCount || 3);
  const [currentPage, onPageChange] = useState(defaultActivePage || 1);

  const ref = useRef<HTMLDivElement>(null!);
  const refCard = useRef<HTMLDivElement>(null!);

  const { pageWithoutDots, totalPageCount, selectedCards } = useCarousel({
    selected,
    cards,
    currentPage,
    variant,
  });

  const { width, widthCard } = useResize({ ref, setSelected, cardWidth, refCard } as UseResizeProps);

  const lastPage = pageWithoutDots && pageWithoutDots[pageWithoutDots.length - 1];

  const goToNextPage = () => onPageChange(currentPage + 1);

  const goToPrevPage = () => onPageChange(currentPage - 1);

  if (totalPageCount < currentPage && totalPageCount > 0) {
    onPageChange(totalPageCount);
  }

  const marginRight = width < 900 ? marginCard / 2 : marginCard * (selected - 1);

  const marginLeft = width < 900 ? marginCard / 2 : marginCard;

  return (
    <div
      className={stylesCss['carousel-container']}
      ref={ref}
      style={carouselContainerStyles}
      data-testid={`carousel-${i18n}`}
    >
      <div className={stylesCss['carousel-container__header']}>
        {header}
        {variant !== 'withoutArrows' && !!cards.length && totalPageCount > 1 && (
          <div>
            {CustomArrowBtn ? (
              <>
                {renderChild(CustomArrowBtn, {
                  disabled: disabled || currentPage === 1,
                  onClick: goToPrevPage,
                  isLeftArrow: true,
                })}
                {renderChild(CustomArrowBtn, {
                  disabled: disabled || currentPage === lastPage,
                  onClick: goToNextPage,
                  isLeftArrow: false,
                })}
              </>
            ) : (
              <HeaderArrows
                disabled={disabled}
                lastPage={lastPage}
                currentPage={currentPage}
                goToNextPage={goToNextPage}
                goToPrevPage={goToPrevPage}
              />
            )}
          </div>
        )}
      </div>
      <div className={stylesCss['carousel-container__body']} style={cardContainerStyles}>
        <div ref={refCard} style={{ height: 0, width: '100%', maxWidth: cardWidth + 'px' }} />
        <div style={{ gap: marginCard + 'px', display: 'flex', width: '100%', ...cardContainerStyles }}>
          {!cards.length ? (
            <div className={stylesCss['no-cards-container']}>
              <span className={stylesCss['carousel-container__text']}>{noCardsText}</span>
            </div>
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
                    <div
                      className={stylesCss['side-card-box']}
                      style={{ right: index === 0 ? 'auto' : 0 }}
                      key={item.key}
                    >
                      {renderChildren(children, {
                        ...item,
                        ...styles.card,
                        maxWidth: cardWidth,
                        style: styles.sideCardParent,
                      })}
                      {renderChildren(children, {
                        ...item,
                        style: {
                          ...styles.sideCardChild,
                          ...styles.card,
                          maxWidth: cardWidth,
                          right:
                            index === 0
                              ? `calc(100% + ${marginLeft}px`
                              : width - (selected - 1) * widthCard - widthCard - marginRight + 'px',
                        },
                      })}
                    </div>
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
      {variant !== 'withoutPagination' && !!cards.length && totalPageCount > 1 && (
        <div className={stylesCss['carousel-container__pagination-box']}>
          {[...cards].splice(0, totalPageCount).map((item, index) => {
            return CustomPaginationBtn ? (
              renderChild(CustomPaginationBtn, {
                onClick: () => onPageChange(index + 1),
                key: `${item.key}-button`,
                disabled: disabled,
                isActivePage: currentPage === index + 1,
              })
            ) : (
              <button
                className={stylesCss['pagination-button']}
                disabled={disabled}
                key={`${item.key}-button`}
                onClick={() => onPageChange(index + 1)}
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
};
