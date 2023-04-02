import React from 'react';
import { renderChild, renderChildren } from '../src/utils';

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
