import React from 'react';

import { renderChild } from '../utils';
import HeaderArrows from './HeaderArrows';
import { ICustomArrowsWrapper } from '../types/CarouselTypes';

const CustomArrowsWrapper = ({
  CustomArrowBtn,
  disabled,
  currentPage,
  lastPage,
  handlePrevPage,
  handleNextPage,
}: ICustomArrowsWrapper) => {
  return (
    <div>
      {CustomArrowBtn ? (
        <>
          {renderChild(CustomArrowBtn, {
            disabled: disabled || currentPage === 1,
            onClick: handlePrevPage,
            isLeftArrow: true,
          })}
          {renderChild(CustomArrowBtn, {
            disabled: disabled || currentPage === lastPage,
            onClick: handleNextPage,
            isLeftArrow: false,
          })}
        </>
      ) : (
        <HeaderArrows
          disabled={disabled}
          lastPage={lastPage}
          currentPage={currentPage}
          goToNextPage={handleNextPage}
          goToPrevPage={handlePrevPage}
        />
      )}
    </div>
  );
};

export default CustomArrowsWrapper;
