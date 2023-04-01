import React from 'react';
import ReactDOM from 'react-dom/client';
import { Carousel } from 'react-carousel-cards-npm';

const Card = (props: any) => {
  /** In props will be all values which are in cards array **/
  console.log('props', props);

  return (
    /** Add wrapper to card and path to styles={props.style} for correct displaying **/
    <div style={props.style}>
      <div
        style={{
          backgroundColor: props.backgroundColor,
          height: '300px',
          width: '100%',
          maxWidth: '320px',
          borderRadius: '5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          padding: '0 20px 0 0',
        }}
      >
        {props.backgroundColor}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <div
      style={{
        background: '#1000015d',
        /** Add position relative for wrapper and overflowX hidden for hidding side cards **/
        position: 'relative',
        overflowX: 'hidden',
        padding: '0 30px 20px',
      }}
    >
      <Carousel
        i18n='cards'
        header={<h1>Carousel</h1>}
        cardWidth={300}
        marginCard={5}
        cards={[
          {
            backgroundColor: 'red',
            key: '1-red',
          },
          {
            backgroundColor: 'blue',
            key: '1-blue',
          },
          {
            backgroundColor: 'orange',
            key: '1-orange',
          },
          {
            backgroundColor: 'purple',
            key: '1-purple',
          },
        ]}
        noCardsText={'No cards selected'}
      >
        <Card />
      </Carousel>
    </div>
  </React.StrictMode>,
);
