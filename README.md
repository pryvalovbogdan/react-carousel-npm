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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <div>
          <Carousel cards={[]} i18={'Cards'}>
            <div>Card body</div>
          </Carousel>
        </div>
    </React.StrictMode>,
)

```

[npm-url]: https://www.npmjs.com/package/react-carousel-cards-npm
[npm-image]: https://img.shields.io/npm/v/react-carousel-cards-npm
[github-license]: https://img.shields.io/github/license/pryvalovbogdan/react-carousel-npm
[github-license-url]: https://github.com/pryvalovbogdan/react-carousel-npm/blob/main/LICENSE
[github-build]: https://github.com/pryvalovbogdan/react-carousel-npm/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/pryvalovbogdan/react-carousel-npm/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-carousel-cards-npm
