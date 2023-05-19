# react-carousel-npm
React component Carousel

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

## Installation:

```bash
npm install react-carousel-cards-npm --save-dev
```

or

```bash
yarn add -D react-carousel-cards-npm
```

![With SIde Cards Carousel](https://github.com/pryvalovbogdan/react-carousel-npm/blob/main/public/WithSIdeCards.gif)

## Usage:

First Create `Card` component which will be inside `Carousel`:

```javascript
const Card = (props: any) => {
  /** In props will be all values which are in cards array **/
  console.log('Card props', props);
    
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
          /** Also add width and maxWidth for image if it's large **/
          style={{ borderRadius: '8px 8px 0 0', objectFit: 'cover', width: props.width, maxWidth: props.maxWidth }}
        />
        <div style={{ padding: '16px', fontSize: '18px', fontWeight: 700, borderRadius: '0 0 8px 8px' }}>
          {props.name}
        </div>
     </div>
  );
};
```

Add `Carousel` to your component variant `With Side Cards`:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Carousel } from 'react-carousel-cards-npm'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const cards = [
  {
    id: 'da57db-4ea7-4258-8f34-74425bbc444422', 
    name: 'Amsterdam is the capital and most populous city of the Netherlands.', 
    imageSrc: 'https://i.ytimg.com/vi/DHGNQUfcgEE/maxresdefault.jpg',},
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
          header={<h1>With Side Cards Carousel</h1>}
          /** Set your card width **/
          cardWidth={445}
          marginCard={16}
          variant='withSideCards'
          /** Add key for each card ID **/
          cards={cards.map(item => ({...item, key: item.id}))}
          noCardsText='No cards selected'
        >
          <Card />
        </Carousel>
    </div>
  </React.StrictMode>,
);
```
***

![Regular Carousel](https://github.com/pryvalovbogdan/react-carousel-npm/blob/main/public/RegularCarousel.gif)

### Regular `Carousel` component:

```javascript
<Carousel
  i18n='cards'
  header={<h1>Regular Carousel</h1>}
  /** Set your card width **/
  cardWidth={445}
  marginCard={16}
  /** Add key for each card ID **/
  cards={cards.map(item => ({ ...item, key: item.id }))}
  noCardsText='No cards selected'
>
  <Card />
</Carousel>
```


![Custom Arrows and Pagination](https://github.com/pryvalovbogdan/react-carousel-npm/blob/main/public/CustomArrows.gif)

### Custom `CustomArrowBtn` if you want to add your own arrows:

Create custom button:

```javascript
const CustomArrowBtn = (props: any) => {
  const { isLeftArrow, ...rest } = props;
  /** In props will be which arrow left/right = isLeftArrow **/
  console.log('Arrow props', props);

  return <button {...rest}>{isLeftArrow ? '<' : '>'}</button>;
};
```

Create `CustomPaginationBtn` pagination:

```javascript
const CustomPaginationBtn = (props: any) => {
  const { isActivePage, ...rest } = props;
  /** In props will be which pagination btn is active = isActivePage **/
  console.log('Pagination btn props', props);

  return (
    <button {...rest} style={{ backgroundColor: isActivePage ? 'orange' : 'grey' }}>
      click
    </button>
  );
};
```

Add `CustomArrowBtn` or ` to your `Carousel`:

```javascript
<Carousel
  i18n='cards'
  header={<h1>With Custom Arrows Carousel</h1>}
  paginationButtonStyles={{ cursor: 'pointer', marginBottom: '10px' }}
  cardWidth={445}
  marginCard={16}
  variant='withSideCards'
  cards={cards.map(card => ({ ...card, key: card.id }))}
  noCardsText='No cards selected'
  CustomArrowBtn={<CustomArrowBtn />}
  CustomPaginationBtn={<CustomPaginationBtn />}
>
  <Card />
</Carousel>
```

![No Cards Block](https://github.com/pryvalovbogdan/react-carousel-npm/blob/main/public/NoCards.png)

### No cards Block of `Carousel`:

```javascript
<Carousel
  i18n='cards'
  header={<h1>No Cards Carousel</h1>}
  paginationButtonStyles={{ cursor: 'pointer', marginBottom: '10px' }}
  cardWidth={445}
  marginCard={16}
  variant='withSideCards'
  cards={[]}
  noCardsText='No cards selected'
>
  <Card />
</Carousel>
```

![Custom No Cards Block](https://github.com/pryvalovbogdan/react-carousel-npm/blob/main/public/CustomNoCardsBlock.png)

### `CustomNoCardsBlock` of `Carousel`:

```javascript
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
```

### Several variants example of `Carousel`:

```javascript
<Carousel
  i18n='cards'
  header={<h1>Carousel</h1>}
  cardWidth={445}
  marginCard={16}
  variant={['withSideCards', 'withoutArrows']}
  cards={[]}
>
  <Card />
</Carousel>
```

![UseCarouselContext Usage](https://github.com/pryvalovbogdan/react-carousel-npm/blob/main/public/UseContextExample.gif)

### Custom `Arrows` using `useCarouselContext`:

Create custom arrows and get handles from `useCarouselContext`:

```javascript
const CustomArrowsPreview = () => {
  const { handlePrevPage, currentPage, handleNextPage, totalPageCount } = useCarouselContext();

  const btnStyles: CSSProperties = {
    position: 'absolute',
    top: '50%',
    border: 'none',
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

```

Necessary to cover `Carousel` and `CustomArrowsPreview` inside provider for correct work if you want to use `useCarouselContext`:

```javascript
<CarouselContextProvider>
  <Carousel
    i18n='cards'
    header={<h1>Use Carousel Context</h1>}
    paginationButtonStyles={{ cursor: 'pointer', marginBottom: '10px' }}
    cardWidth={445}
    marginCard={16}
    defaultActivePage={2}
    variant={['regular', 'withoutArrows']}
    cards={cards.map(card => ({ ...card, key: card.id }))}
    noCardsText='No cards selected'
    CustomNoCardsBlock={<CustomNoCardsBlock />}
  >
    <Card />
  </Carousel>
  <CustomArrowsPreview />
</CarouselContextProvider>
```

### Example swipes of `Carousel` in mobile:

![Mobile Swipes](https://github.com/pryvalovbogdan/react-carousel-npm/blob/main/public/MobileSwipes.gif)

### Props `Carousel`:

| Name                     | Type                                                                                              | Description                                       |
|:-------------------------|---------------------------------------------------------------------------------------------------|:--------------------------------------------------|
| header                   | `React.ReactNode`                                                                                 | Header of Carosel where you can                   |
| cards                    | `any[]`                                                                                           | Cards array which will be shown inside `Carousel` |
| disabled                 | `boolean`                                                                                         | To disable arrows                                 |
| variant                  | `regular`<br/> `withSideCards` <br/> `withoutArrows`  <br/> `withoutPagination` <br/> `Variant[]` | Variants for shoing `Carousel`.                   |
| cardWidth                | `number`                                                                                          | Each card max width `Default = 300 px`            |
| marginCard               | `number`                                                                                          | Margin between 2 cards                            |
| noCardsText              | `string`                                                                                          | No cards text inside block.                       |
| CustomArrowBtn           | `React.ReactNode`                                                                                 | Custom arrows for `Carousel`                      |
| CustomPaginationBtn      | `React.ReactNode`                                                                                 | Custom Pagination for `Carousel`                  |
| children                 | `React.ReactNode`                                                                                 | Cards inside `Carousel`                           |
| defaultCardsCount        | `number`                                                                                          | How many cards will be shown on page by default   |
| defaultActivePage        | `number`                                                                                          | Which page will be active by default              |
| cardContainerStyles      | `React.CSSProperties`                                                                             | Styles for cards container                        |
| carouselContainerStyles  | `React.CSSProperties`                                                                             | Styles for carousel container                     |
| paginationButtonStyles   | `React.CSSProperties`                                                                             | Styles for pagination button                      |
| CustomNoCardsBlock       | `React.ReactNode`                                                                                 | Custom No cards Block                             |


### Props `useCarouselContext`:

| Name                     | Type                      | Description                    |
|:-------------------------|---------------------------|:-------------------------------|
| currentPage              | `number`                  | Active selected page           |
| totalPageCount           | `number`                  | Total pages count              |
| handleNextPage           | `() => void`              | Handle to switch to next page  |
| handlePrevPage           | `() => void`              | Handle to switch to prev page  |
| onCurrentPage            | `(page: number) => void`  | Set state to exact page        |
| onTotalPageCountChange   | `(count: number) => void` | Set state to exact total count |


## If you want to support

Give a ⭐️ to project if you like it!

[npm-url]: https://www.npmjs.com/package/react-carousel-cards-npm
[npm-image]: https://img.shields.io/npm/v/react-carousel-cards-npm
[github-license]: https://img.shields.io/github/license/pryvalovbogdan/react-carousel-npm
[github-license-url]: https://github.com/pryvalovbogdan/react-carousel-npm/blob/main/LICENSE
[github-build]: https://github.com/pryvalovbogdan/react-carousel-npm/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/pryvalovbogdan/react-carousel-npm/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-carousel-cards-npm
