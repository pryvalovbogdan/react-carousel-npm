import React from 'react';
import { renderChildren } from '../utils';

describe('renderChildren', () => {
  it('returns the children as-is if they are not valid React elements', () => {
    const text = 'Hello, world!';

    const result = renderChildren(text, { greeting: 'Hi' });

    expect(result).toEqual(['Hello, world!']);
  });
});
