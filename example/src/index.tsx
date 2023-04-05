import React from 'react';
import ReactDOM from 'react-dom/client';
import { Carousel } from 'react-carousel-cards-npm';

const Card = (props: any) => {
  /** In props will be all values which are in cards array **/
  console.log('props', props);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 10px 15px 0px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        /** Add wrapper to card and path to styles={props.style} for correct displaying **/
        ...props.style,
      }}
    >
      <img src={props.imageSrc} height={'240px'} style={{ borderRadius: '8px 8px 0 0', objectFit: 'cover' }} />
      <div style={{ padding: '16px', fontSize: '18px', fontWeight: 700, borderRadius: '0 0 8px 8px' }}>
        {props.name}
      </div>
    </div>
  );
};

const CustomArrowBtn = (props: any) => {
  const { isLeftArrow, ...rest } = props;

  console.log('arrow props', props);

  return <button {...rest}>{isLeftArrow ? '<' : '>'}</button>;
};

const CustomPaginationBtn = (props: any) => {
  const { isActivePage, ...rest } = props;

  console.log('pagination btn', props);

  return (
    <button {...rest} style={{ backgroundColor: isActivePage ? 'orange' : 'grey' }}>
      click
    </button>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const cards = [
  {
    id: 'da57db-4ea7-4258-8f34-74425bbc444422',
    name: 'Amsterdam is the capital and most populous city of the Netherlands.',
    imageSrc: 'https://i.ytimg.com/vi/DHGNQUfcgEE/maxresdefault.jpg',
  },
  {
    id: '123xzda57db-4ea7-4258-8f34-74425bbc444422',
    name: 'London is the capital and largest city of England and the United Kingdom, with a population of just under 9 million.',
    imageSrc:
      'https://media.istockphoto.com/id/1345970136/photo/elevated-dusk-view-to-the-illuminated-tower-bridge-and-skyline-of-london.jpg?b=1&s=170667a&w=0&k=20&c=7kFYQyQDyKz-97yZYzWRE6TcMFre4-LFGfGrVORwudw=',
  },
  {
    id: '789zxda57db-4ea7-4258-8f34-74425bbc444411',
    name: 'Tokyo is the capital and most populous city of Japan.',
    imageSrc: 'https://i.pinimg.com/originals/94/43/57/944357cc0e0fdcbdfd9e266c4422a1a3.jpg',
  },
  {
    id: '712389zxda57db-4ea7-4258-8f34-74425bbc444411',
    name: 'Seoul, officially the Seoul Special Metropolitan City, is the capital and largest metropolis of the Republic of Korea.',
    imageSrc: 'https://c4.wallpaperflare.com/wallpaper/798/291/709/autumn-lake-park-building-wallpaper-preview.jpg',
  },
  {
    id: '783219zxda57db-4ea7-4258-8f34-74425bbc444411',
    name: 'New York, often called New York City or NYC, is the most populous city in the United States.',
    imageSrc:
      'https://4kwallpapers.com/images/wallpapers/new-york-city-empire-state-building-cityscape-skyline-4480x2520-7284.jpg',
  },
];

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
        cards={cards.map(card => ({ ...card, key: card.id }))}
        noCardsText={'No cards selected'}
        CustomPaginationBtn={<CustomPaginationBtn />}
        CustomArrowBtn={<CustomArrowBtn />}
      >
        <Card />
      </Carousel>
    </div>
  </React.StrictMode>,
);
