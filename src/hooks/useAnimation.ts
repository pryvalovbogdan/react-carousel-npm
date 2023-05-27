import { UseAnimationProps, UseAnimationReturnedValues } from '../types/CarouselTypes';
import { useEffect, useState } from 'react';

export const useAnimation = ({ withAnimation, selectedCards }: UseAnimationProps): UseAnimationReturnedValues => {
  const [isAnimate, setIsAnimate] = useState<boolean>(false);

  const disableAnimation = () => setIsAnimate(false);

  useEffect(() => {
    if (!withAnimation || isAnimate) {
      return;
    }

    const sliderInterval = setInterval(() => {
      setIsAnimate(true);
    }, withAnimation.animationInterval ?? 500);

    return () => {
      clearInterval(sliderInterval);
    };
  }, [withAnimation, isAnimate]);

  useEffect(() => {
    if (!withAnimation) {
      return;
    }

    disableAnimation();
  }, [JSON.stringify(selectedCards)]);

  return { isAnimate, disableAnimation };
};
