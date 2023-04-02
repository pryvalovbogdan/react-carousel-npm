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

Add `Carousel` to your component:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Carousel } from 'react-carousel-cards-npm'

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
                /** Set your card width **/
				cardWidth={300}
				marginCard={5}
                CustomPaginationBtn={<CustomPaginationBtn />}
                CustomArrowBtn={<CustomArrowBtn />}
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
				noCardsText='No cards selected'
			>
				<Card />
			</Carousel>
		</div>
	</React.StrictMode>,
);
```

[npm-url]: https://www.npmjs.com/package/react-carousel-cards-npm
[npm-image]: https://img.shields.io/npm/v/react-carousel-cards-npm
[github-license]: https://img.shields.io/github/license/pryvalovbogdan/react-carousel-npm
[github-license-url]: https://github.com/pryvalovbogdan/react-carousel-npm/blob/main/LICENSE
[github-build]: https://github.com/pryvalovbogdan/react-carousel-npm/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/pryvalovbogdan/react-carousel-npm/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-carousel-cards-npm
