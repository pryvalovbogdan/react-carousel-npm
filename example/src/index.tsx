import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom/client';
import { Carousel, CarouselContextProvider, useCarouselContext } from 'react-carousel-cards-npm';
import '../styles.css';

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
      <img
        src={props.imageSrc}
        height={'240px'}
        width={'100%'}
        style={{ borderRadius: '8px 8px 0 0', objectFit: 'cover', width: props.width, maxWidth: props.maxWidth }}
      />
      <div style={{ padding: '16px', fontSize: '18px', fontWeight: 700, borderRadius: '0 0 8px 8px' }}>
        {props.name}
      </div>
    </div>
  );
};

const CustomArrowBtn = (props: any) => {
  const { isLeftArrow, ...rest } = props;
  /** In props will be which arrow left/right = isLeftArrow **/
  console.log('Arrow props', props);

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

const CustomNoCardsBlock = (props: any) => {
  /** In props will be noCardsText **/
  console.log('No cards props', props);

  return (
    <div
      style={{
        width: '100%',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid gray',
        borderRadius: '8px',
        backgroundColor: 'lightcyan',
      }}
    >
      {props.noCardsText}
    </div>
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
    name: 'London is the capital and largest city of England and the United Kingdom.',
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
    name: 'Seoul, officially the Seoul Special Metropolitan City, is the capital of the Republic of Korea.',
    imageSrc: 'https://c4.wallpaperflare.com/wallpaper/798/291/709/autumn-lake-park-building-wallpaper-preview.jpg',
  },
  {
    id: '783219zxda57db-4ea7-4258-8f34-74425bbc444411',
    name: 'New York, often called New York City or NYC, is the most populous city in the United States.',
    imageSrc:
      'https://4kwallpapers.com/images/wallpapers/new-york-city-empire-state-building-cityscape-skyline-4480x2520-7284.jpg',
  },
];

const CustomArrowsPreview = () => {
  const { handlePrevPage, currentPage, handleNextPage, totalPageCount } = useCarouselContext();

  const btnStyles: CSSProperties = {
    position: 'absolute',
    top: '50%',
    background: 'cornflowerblue',
    padding: '14px',
    cursor: 'pointer',
  };

  console.log('currentPage', currentPage);

  return (
    <>
      <button style={{ ...btnStyles, left: 0 }} onClick={handlePrevPage} disabled={currentPage === 1}>
        prev
      </button>
      <button style={{ ...btnStyles, right: 0 }} onClick={handleNextPage} disabled={currentPage === totalPageCount}>
        next
      </button>
    </>
  );
};

root.render(
  <React.StrictMode>
    <div
      style={{
        background: 'rgba(0, 0, 0, 0.03)',
        overflowX: 'hidden',
        padding: '30px 30px 20px',
        height: 'calc(100% - 50px)',
      }}
    >
      <div
        style={{
          /** Add position relative for wrapper and overflowX hidden for hidding side cards **/
          position: 'relative',
        }}
      >
        {/** Necessary to cover Carousel inside provider for correct work if you want to use useCarouselContext */}
        <CarouselContextProvider>
          <Carousel
            i18n='cards'
            header={<h1>Regular Carousel</h1>}
            paginationButtonStyles={{ cursor: 'pointer', marginBottom: '10px' }}
            cardWidth={445}
            marginCard={16}
            variant={['withSideCards', 'withoutPagination']}
            cards={cards.map(card => ({ ...card, key: card.id }))}
            noCardsText='No cards selected'
            // CustomArrowBtn={<CustomArrowBtn />}
            // CustomPaginationBtn={<CustomPaginationBtn />}
            CustomNoCardsBlock={<CustomNoCardsBlock />}
          >
            <Card />
          </Carousel>
          <CustomArrowsPreview />
        </CarouselContextProvider>
      </div>
    </div>
  </React.StrictMode>,
);
