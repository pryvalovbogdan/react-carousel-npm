import React from 'react';
import { renderChild, renderChildren, setPrevPage, setNextPage } from '../src/utils';

describe('renderChildren', () => {
  it('returns the children as-is if they are not valid React elements', () => {
    const text = 'Hello, world!';

    const result = renderChildren(text, { greeting: 'Hi' });

    expect(result).toEqual(['Hello, world!']);
  });
});

describe('renderChild', () => {
  it('returns cloned element with props if child is a valid React element', () => {
    const child = <button />;
    const props = { onClick: jest.fn() };
    const clonedChild: any = renderChild(child, props);

    expect(clonedChild.props).toEqual(props);
    expect(clonedChild.type).toEqual('button');
  });

  it('returns the child as is if it is not a valid React element', () => {
    const child = 'Hello, world!';
    const result = renderChild(child);

    expect(result).toEqual(child);
  });
});

describe('setPrevPage', () => {
  it('should decrement the page number by 1 if it is greater than 1', () => {
    let pageNumber = 2;
    const callback = (page: (prevState: number) => number) => {
      pageNumber = page(pageNumber);
    };

    const prevPage = setPrevPage(callback);
    prevPage();

    expect(pageNumber).toBe(1);
  });

  it('should set the page number to 1 if it is 1', () => {
    let pageNumber = 1;
    const callback = (page: (prevState: number) => number) => {
      pageNumber = page(pageNumber);
    };

    const prevPage = setPrevPage(callback);
    prevPage();

    expect(pageNumber).toBe(1);
  });
});

describe('setNextPage', () => {
  it('should increment the page number by 1', () => {
    let pageNumber = 1;
    const callback = (page: (prevState: number) => number) => {
      pageNumber = page(pageNumber);
    };

    const nextPage = setNextPage(callback);
    nextPage();

    expect(pageNumber).toBe(2);
  });
});
