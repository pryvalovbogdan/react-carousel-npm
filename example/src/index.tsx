import React from 'react';
import ReactDOM from 'react-dom/client';
import { Carousel } from 'react-carousel-cards-npm';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div>
      <Carousel i18n='cards' cards={[]}>
        <div>Card body</div>
      </Carousel>
    </div>
    <hr />
  </React.StrictMode>,
);
