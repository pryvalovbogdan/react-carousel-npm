import { UseResizeProps, UseResizeReturnedValues } from '../types/CarouselTypes';
import { useEffect, useLayoutEffect, useState } from 'react';

export const useResize = ({
  ref,
  setSelected,
  cardWidth,
  refCard,
  variant,
}: UseResizeProps): UseResizeReturnedValues => {
  const [width, setWidth] = useState(0);
  const [widthCard, setWidthCard] = useState(cardWidth);

  useEffect(() => {
    if (width) {
      const selected = Math.ceil(width / cardWidth);

      const selectedCount = variant === 'regular' ? 1 : 2;

      setSelected(selected > 1 ? selected : selectedCount);
    }
  }, [width, cardWidth, setSelected]);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (ref && ref.current) {
        setWidth(ref.current.offsetWidth);
      }

      if (refCard && refCard.current) {
        setWidthCard(refCard.current.offsetWidth);
      }
    };

    window.addEventListener('resize', updateSize);

    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return { width, setWidth, widthCard };
};
