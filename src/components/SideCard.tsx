import React from 'react';

import stylesCss from '../styles/carousel.module.css';
import { renderChildren } from '../utils';
import { ISideCard } from '../types/CarouselTypes';

const SideCard = ({ child, cardWidth, item, width, index, selected, widthCard, marginCard = 1 }: ISideCard) => {
  const marginRight = width < 900 ? marginCard / 2 : marginCard * (selected - 1);
  const marginLeft = width < 900 ? marginCard / 2 : marginCard;

  return (
    <div className={stylesCss['side-card-box']} style={{ right: index === 0 ? 'auto' : 0 }} key={item.key}>
      {renderChildren(child, {
        ...item,
        ...styles.card,
        maxWidth: cardWidth,
        style: styles.sideCardParent,
      })}
      {renderChildren(child, {
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
};

export default SideCard;

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
