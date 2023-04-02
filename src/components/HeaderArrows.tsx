import React from 'react';
import stylesCss from '../styles/carousel.module.css';
import { IHeaderArrows } from '../types/CarouselTypes';

const HeaderArrows = ({ disabled, currentPage, lastPage, goToPrevPage, goToNextPage }: IHeaderArrows) => {
  return (
    <>
      <button
        className={stylesCss['button']}
        color='neutral'
        disabled={disabled || currentPage === 1}
        onClick={goToPrevPage}
      >
        <a className={`${stylesCss['icon']} ${stylesCss['icon__previous']}`} />
      </button>
      <button
        className={stylesCss['button']}
        color='neutral'
        disabled={disabled || currentPage === lastPage}
        onClick={goToNextPage}
      >
        <a className={`${stylesCss['icon']} ${stylesCss['icon__next']}`} />
      </button>
    </>
  );
};

export default HeaderArrows;
