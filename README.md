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

## Usage :

First Create `Card` component which will be inside `Carousel`:

```javascript
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

Add `Carousel` to your component:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Carousel } from 'react-carousel-cards-npm'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const cards = [
	{
		id: 'da57db-4ea7-4258-8f34-74425bbc444422',
		name: 'Amsterdam is the capital and most populous city of the Netherlands.',
		imageSrc: 'https://i.ytimg.com/vi/DHGNQUfcgEE/maxresdefault.jpg',
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
				header={<h1>Regular Carousel</h1>}
                /** Set your card width **/
				cardWidth={300}
				marginCard={5}
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

![Regular Carousel](https://github.com/pryvalovbogdan/react-carousel-npm/blob/main/public/RegularCarousel.gif)

[npm-url]: https://www.npmjs.com/package/react-carousel-cards-npm
[npm-image]: https://img.shields.io/npm/v/react-carousel-cards-npm
[github-license]: https://img.shields.io/github/license/pryvalovbogdan/react-carousel-npm
[github-license-url]: https://github.com/pryvalovbogdan/react-carousel-npm/blob/main/LICENSE
[github-build]: https://github.com/pryvalovbogdan/react-carousel-npm/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/pryvalovbogdan/react-carousel-npm/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-carousel-cards-npm
